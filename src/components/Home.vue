<template>
     <div class="contenedor">
        <div class="chart-container">
            <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
    </div> 
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import Chart  from 'primevue/chart';
import db from '@/firestore';

const chartData = ref(null);
const chartOptions = ref(null);

// Función para obtener las actas desde Firestore
async function obtenerActas() {
  const querySnapshot = await getDocs(collection(db, 'actaCollection'));
  const actas = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const acta = doc.data();
      const activosQuerySnapshot = await getDocs(collection(db, 'actaCollection', doc.id, 'activos'));
      acta.activos = activosQuerySnapshot.docs.map((activoDoc) => activoDoc.data());
      return acta;
    })
  );

  // Invierte el array PERMANENTEMENTE para que la primera acta de la lista sea la última ingresada
  actas.reverse();

  // Extrae los datos para la gráfica
  const tiposActas = actas.reduce((acumulador, acta) => {
    const tipoActa = acta.tipo;
    if (acumulador[tipoActa]) {
      acumulador[tipoActa]++;
    } else {
      acumulador[tipoActa] = 1;
    }
    return acumulador;
  }, {});

  // Formatea los datos para Chart.js
  const chartLabels = Object.keys(tiposActas);
  const chartDataValues = Object.values(tiposActas);

  

  // Establece los datos y opciones de la gráfica
  chartData.value = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Cantidad de Actas',
        data: chartDataValues,
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
        borderWidth: 1
      },
    ],
  };

  // Opciones de la gráfica (puedes personalizarlas según tus necesidades)
  chartOptions.value = {
    responsive: true,
    /* maintainAspectRatio: false,  */
     aspectRatio: 1.5, 
    
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
        precision: 0,
        
      },
    },
    plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `Total de Actas: ${actas.length}`,
      font: {
        size: 16, // Tamaño de la fuente deseado
      },
    },
  },
  };
}

onMounted(() => {
  obtenerActas();
});
</script>



<style scoped>
.contenedor {
    width: 900px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(242, 242, 242);
    margin-left: 180px;
    margin-top: 50px;

} 


</style>
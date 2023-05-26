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

//  obtener las actas desde Firestore
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

  const tiposActa = ['Entrega', 'Devolución', 'Prestamo', 'Orden de Salida'];

  //  objeto para almacenar las cantidades de actas por tipo
  const tiposActaCantidades = {};

  // Calcular las cantidades de actas por tipo
  actas.forEach((acta) => {
    const tipoActa = acta.tipo;
    if (tiposActaCantidades[tipoActa]) {
      tiposActaCantidades[tipoActa]++;
    } else {
      tiposActaCantidades[tipoActa] = 1;
    }
  });

  // Crear un objeto con los datos para Chart.js
  const chartLabels = tiposActa;
  const chartDataValues = tiposActa.map((tipo) => tiposActaCantidades[tipo] || 0);

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

  // Opciones de la gráfica 
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
        size: 16, 
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
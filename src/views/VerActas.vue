<template>
    <div class="contenedorSol">

        <div class="contenedorDt">
            <div class="card">
                <DataTable ref="dt" :value="actas" dataKey="id" :paginator="true" :rows="5" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25, 50]"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Actas en total">
                    <h2>Actas</h2>
                    <template #header>
                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                            <span class="p-input-icon-left">
                                <InputText v-model="filters['global'].value" placeholder="Busqueda" />
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="id" header="id" :sortable="true" style="min-width:5rem" :sort-function="sortById">
                    </Column>
                    <!-- <Column field="nombre" header="Nombre Equipo" sortable style="min-width:5rem"></Column> -->
                    <Column field="nombre" header="Nombre" sortable style="min-width:5rem"></Column>
                    <Column field="direccionSelec.nombre" header="Departamento" sortable style="min-width:5rem"></Column>
                    <Column field="tipo" header="Tipo" sortable style="min-width:5rem"></Column>
                    <Column field="fecha" header="Fecha Acta" sortable style="min-width:5rem"></Column>
                    <Column :exportable="false" style="min-width:10rem" header="Activos">
                        <template #body="slotProps">
                            <Button @click="mostrarActivos(slotProps.data)" label="Ver Activos" outlined rounded
                                class="mr-2" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem" header="Actas">
                        <template #body="slotProps">
                            <Button label="Exportar" icon="pi pi-download" text class="p-button-success"
                                @click="exportarPDF(slotProps.data)" />
                        </template>
                    </Column>


                </DataTable>

                <Dialog v-model:visible.sync="mostrarDialogActivos" :modal="true"
                    :header="`Activos del Acta ${activoSeleccionado && activoSeleccionado ? activoSeleccionado.id : ''}`"
                    ref="dialogActa">
                    <div v-if="activoSeleccionado && activoSeleccionado.activos && activoSeleccionado.activos.length > 0">

                        <DataTable v-if="tieneOtrosActivos(activoSeleccionado.activos)"
                            :value="filtrarOtrosActivos(activoSeleccionado.activos)" dataKey="id"
                            :style="{ width: '500px' }">
                            <!-- Columnas del DataTable para otros activos -->
                            <Column field="id" header="ID"></Column>
                            <Column field="tipo" header="Tipo"></Column>
                            <Column field="marca" header="Marca"></Column>
                            <Column field="modelo" header="Modelo"></Column>
                            <Column field="serie" header="Serie"></Column>
                            <Column field="numInv" header="NumInv"></Column>
                        </DataTable>

                        <DataTable v-if="tieneComputadorEscritorioPortatil(activoSeleccionado.activos)"
                            :value="filtrarComputadorEscritorioPortatil(activoSeleccionado.activos)" dataKey="id">
                            <!-- Columnas del DataTable para Computador Escritorio y Portatil -->
                            <h4>Equipamiento Computacional</h4>
                            <Column field="id" header="ID"></Column>
                            <Column field="nombreEquipo" header="Nombre"></Column>
                            <Column field="tipo" header="Tipo"></Column>
                            <Column field="marca" header="Marca"></Column>
                            <Column field="modelo" header="Modelo"></Column>
                            <Column field="serie" header="Serie"></Column>
                            <Column field="numInv" header="NumInv"></Column>
                            <Column field="procesador" header="Procesador"></Column>
                            <Column field="ram" header="RAM"></Column>
                            <Column field="discoDuro" header="Disco Duro"></Column>
                            <Column field="dvd" header="Lector/Grab DVD"></Column>
                            <Column field="tecladoMouse" header="Teclado Y Mouse"></Column>

                        </DataTable>


                    </div>
                    <p v-else>No se encontraron activos asociados.</p>

                    <template #footer>
                        <Button label="Cerrar" icon="pi pi-times" text @click="cerrarDialog" />

                    </template>
                </Dialog>
                <!-- prueba -->

            </div>
        </div>


    </div>
    <Toast />
</template>

<script setup >
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore'
import { FilterMatchMode } from 'primevue/api';
import db from '@/firestore';
import { useToast } from 'primevue/usetoast';
import html2pdf from 'html2pdf.js';



const toast = useToast();

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

/* onMounted(() => {
    ListSolicitudes.getSolicitudesData().then((data) => (actas.value = data));
}); */

const sortById = (value1, value2) => value2 - value1;
/* const selectedActa = ref(null); */
const actas = ref([]);
const mostrarDialogActivos = ref(false);
const activoSeleccionado = ref({});

const dialogActa = ref(null);

onMounted(async () => {
    await obtenerActas();
});

async function exportarPDF(rowData) {
    try {
        const element = document.createElement('div');
        
        // Construye la tabla de activos para Computador Escritorio y Portátil
        let computadorTable = '';
        if (tieneComputadorEscritorioPortatil(rowData.activos)) {
            computadorTable = `
        
        <table style="border-collapse: collapse; margin-top: 10px; margin-left: 10px;">
          <caption>Equipamiento Computacional</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Serie</th>
              <th>NumInv</th>
              <th>Procesador</th>
              <th>RAM</th>
              <th>Disco Duro</th>
              <th>Lector/Grab DVD</th>
              <th>Teclado y Mouse</th>
            </tr>
          </thead>
          <tbody>
            ${filtrarComputadorEscritorioPortatil(rowData.activos)
                    .map(activo => `
                    
                <tr>
                  <td>${activo.id}</td>
                  <td>${activo.nombreEquipo}</td>
                  <td>${activo.tipo}</td>
                  <td>${activo.marca}</td>
                  <td>${activo.modelo}</td>
                  <td>${activo.serie}</td>
                  <td>${activo.numInv}</td>
                  <td>${activo.procesador}</td>
                  <td>${activo.ram}</td>
                  <td>${activo.discoDuro}</td>
                  <td>${activo.dvd}</td>
                  <td>${activo.tecladoMouse}</td>
                </tr>
              `)
                    .join('')}
          </tbody>
        </table>
      `;
        }

        // Construye la tabla de otros activos
        let otrosActivosTable = '';
        if (tieneOtrosActivos(rowData.activos)) {
            otrosActivosTable = `
        
        <table style="border-collapse: collapse; margin-top: 10px; margin-left: 10px;">
          <caption>Periféricos</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Serie</th>
              <th>NumInv</th>
            </tr>
          </thead>
          <tbody>
            ${filtrarOtrosActivos(rowData.activos)
                    .map(activo => `
                <tr>
                  <td>${activo.id}</td>
                  <td>${activo.tipo}</td>
                  <td>${activo.marca}</td>
                  <td>${activo.modelo}</td>
                  <td>${activo.serie}</td>
                  <td>${activo.numInv}</td>
                </tr>
              `)
                    .join('')}
          </tbody>
        </table>
      `;
        }

        element.innerHTML = `
      <table style="border-collapse: collapse; margin-top: 10px; margin-left: 10px;">
        <tr>
          <td>ID:</td>
          <td>${rowData.id}</td>
        </tr>
        <tr>
          <td>Nombre:</td>
          <td>${rowData.nombre}</td>
        </tr>
        <tr>
          <td>Departamento:</td>
          <td>${rowData.direccionSelec.nombre}</td>
        </tr>
        <tr>
          <td>Tipo:</td>
          <td>${rowData.tipo}</td>
        </tr>
        <tr>
          <td>Fecha Acta:</td>
          <td>${rowData.fecha}</td>
        </tr>
      </table>
      <br>
      ${computadorTable}
      ${otrosActivosTable}
      <br>


    <style>
        table tr th, table tr td {
            padding: 10px 5px 5px 5px;
            border: 1px solid;
        }
        table caption {
          font-weight: bold;
        }
        th {
          font-weight: bold;
        }
        body {
            color: #000000; 
        }
        
    </style>
      
    `;

        html2pdf().from(element).save(`Acta_${rowData.id}.pdf`);
    } catch (error) {
        console.error('Error al exportar a PDF:', error);
    }
}


async function obtenerActas() {
    const querySnapshot = await getDocs(collection(db, 'actaCollection'));
    actas.value = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const acta = doc.data();
        const activosQuerySnapshot = await getDocs(collection(db, 'actaCollection', doc.id, 'activos'));
        acta.activos = activosQuerySnapshot.docs.map((activoDoc) => activoDoc.data());
        return acta;
    }));

    //invierte el array PERMANENTEMENTE para que la primera acta de la lista sea la ultima ingresada
    actas.value.reverse();
}


async function mostrarActivos(acta) {

    /* expandedRowKeys.value = []; */
    // Verifica si hay activos asociados en el objeto acta
    if (acta.activos && acta.activos.length > 0) {

        activoSeleccionado.value = acta;
        mostrarDialogActivos.value = true;


    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se encontraron Activos asociados', life: 4000 });
        return;
    }
}

function tieneComputadorEscritorioPortatil(activos) {
    return activos.some(activo => activo.tipo === 'Computador Escritorio' || activo.tipo === 'Computador Portatil');
}

function filtrarComputadorEscritorioPortatil(activos) {
    return activos.filter(activo => activo.tipo === 'Computador Escritorio' || activo.tipo === 'Computador Portatil');
}

function tieneOtrosActivos(activos) {
    return activos.some(activo => activo.tipo !== 'Computador Escritorio' && activo.tipo !== 'Computador Portatil');
}

function filtrarOtrosActivos(activos) {
    return activos.filter(activo => activo.tipo !== 'Computador Escritorio' && activo.tipo !== 'Computador Portatil');
}

const cerrarDialog = () => {
    mostrarDialogActivos.value = false;

};


</script>

<style scoped>
.contenedorSol {
    font-size: small;
    width: 1050px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    /* background: rgb(223, 223, 223); */
    margin-left: 180px;
    margin-top: -20px;
}


h1,
h2,
h4 {
    text-align: center;

}

.contenedorDt {
    font-size: small;
    width: auto;
    height: auto;
    border-radius: 20px;
    background: rgb(236, 236, 236);
    padding: 20px;
}
</style>
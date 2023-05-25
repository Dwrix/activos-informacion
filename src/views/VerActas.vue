<template>
  <div class="contenedorSol">

    <div class="contenedorDt">
      <div class="card">
        <DataTable ref="dt" :value="actas" dataKey="id" :paginator="true" :rows="5" :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Actas en total">

          <template #header>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
              <span class="p-input-icon-left">
                <InputText v-model="filters['global'].value" placeholder="Busqueda" />
                <i class="pi pi-search"></i>
              </span>
            </div>
          </template>



          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="id" header="id" :sortable="true" style="min-width:5rem " >
          </Column>
          <!-- <Column field="nombre" header="Nombre Equipo" sortable style="min-width:5rem"></Column> -->
          <Column field="nombre" header="Nombre" sortable style="min-width:5rem"></Column>
          <Column field="direccionSelec.nombre" header="Departamento" sortable style="min-width:5rem"></Column>
          <Column field="tipo" header="Tipo" sortable style="min-width:5rem; font-weight: bold;"></Column>
          <Column field="encargado" header="Encargado" sortable style="min-width:5rem"></Column>
          <Column field="fecha" header="Fecha Acta" sortable style="min-width:5rem"></Column>
          <Column :exportable="false" style="min-width:10rem" header="Activos">
            <template #body="slotProps">
              <Button @click="mostrarActivos(slotProps.data)" label="Ver Activos" outlined rounded class="mr-2" />
            </template>
          </Column>
          <Column :exportable="false" style="min-width:8rem" header="Exportar Acta">
            <template #body="slotProps">
              <Button label="Exportar" icon="pi pi-download" @click="exportarPDF(slotProps.data)" />
            </template>
          </Column>

          <Column :exportable="false" style="min-width:10rem" header="Importar PDF">
            <template #body="slotProps">
              <div class="p-inputgroup">
                <div class="p-fileupload">
                  <input type="file" @change="importarPDF(slotProps.data.id, $event.target.files[0])">
                  <span class="p-button p-button-help " @click="$event.target.previousElementSibling.click()">
                    <i class="pi pi-upload"></i>&nbsp;Importar
                  </span>
                </div>
              </div>
            </template>
          </Column>





        </DataTable>

        <Dialog v-model:visible.sync="mostrarDialogActivos" :modal="true"
          :header="`Activos del Acta ${activoSeleccionado && activoSeleccionado ? activoSeleccionado.id : ''}`"
          ref="dialogActa">
          <div v-if="activoSeleccionado && activoSeleccionado.activos && activoSeleccionado.activos.length > 0">

            <DataTable v-if="tieneOtrosActivos(activoSeleccionado.activos)"
              :value="filtrarOtrosActivos(activoSeleccionado.activos)" dataKey="id" :style="{ width: '600px' }">
              <!-- Columnas del DataTable para otros activos -->
              <Column field="id" header="ID"></Column>
              <Column field="tipo" header="Tipo"></Column>
              <Column field="marca" header="Marca"></Column>
              <Column field="modelo" header="Modelo"></Column>
              <Column field="serie" header="Serie"></Column>
              <Column field="numInv" header="Nro Inventario"></Column>
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
              <Column field="numInv" header="Nro Inventario"></Column>
              <Column field="procesador" header="Procesador"></Column>
              <Column field="ram" header="RAM"></Column>
              <Column field="discoDuro" header="Disco Duro"></Column>
              <Column field="dvd" header="Lector/Grab DVD"></Column>
              <Column field="tecladoMouse" header="Teclado Y Mouse"></Column>



            </DataTable>
            <br>
            <div v-if="activoSeleccionado.tipo === 'Entrega'">
              <DataTable v-if="tieneComputadorEscritorioPortatil(activoSeleccionado.activos)"
                :value="activoSeleccionado.activos" dataKey="id" :style="{ width: '700px' }">
                <Column field="id" header="ID del Activo"></Column>
                <Column field="macOS" header="MacOS"></Column>
                <Column field="msOffice" header="MS Office"></Column>
                <Column field="msProyect" header="MS Proyect"></Column>
                <Column field="acrobatReader" header="Acrobat Reader"></Column>
                <Column field="sqlServer" header="Sql Server"></Column>
                <Column field="photoshop" header="Photoshop"></Column>
                <Column field="av" header="Antivirus"></Column>

              </DataTable><br>
            </div>

            <div>
              <div v-if="activoSeleccionado.tipo === 'Orden de Salida'">
                <strong>Motivo Salida: </strong>
                <InputText v-model="activoSeleccionado.motivoSalida" readonly
                  :size="activoSeleccionado.motivoSalida.length || 50" />
              </div><br>
              <div>
                <strong>Observaciones:</strong>
                <InputText v-model="activoSeleccionado.observaciones" readonly
                  :size="activoSeleccionado.motivoSalida.length || 50" />
              </div>
            </div><br>

            <div v-if="activoSeleccionado.tipo === 'Prestamo'">
              <!-- <div>
                <strong style="margin-right: 30px;">Nombre persona que gestiona entrega y devolución:</strong>
                 <InputText v-model="" readonly
                   /> 
              </div -->
              <div style="display: flex; align-items: center;">
                <strong style="margin-right: 30px;">Fecha del Préstamo:</strong>
                <Calendar v-model="activoSeleccionado.fechaEntregaPrestamo" showIcon disabled />
              </div>
              <div style="display: flex; align-items: center;">
                <strong style="margin-right: 5px;">Fecha de la Devolución:</strong>
                <Calendar v-model="activoSeleccionado.fechaDevolucionPrestamo" showIcon disabled />
              </div>
            </div>


          </div>
          <p v-else>No se encontraron activos asociados.</p>

          <div v-if="activoSeleccionado"><br>
            <Button label="Ver PDF" icon="pi pi-download" class="p-button-success p-button-rounded"
              @click="descargarPDF(activoSeleccionado.id)" />


          </div>
          <div>

          </div>
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
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from 'primevue/usetoast';


import { useActaStore } from '@/stores/store'


const store = useActaStore()

const toast = useToast();

const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const actas = ref([]);
const mostrarDialogActivos = ref(false);
const activoSeleccionado = ref({});
const dialogActa = ref(null);

onMounted(async () => {
  await obtenerActas();
});

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

async function descargarPDF(actaId) {
  try {
    const storage = getStorage();
    const storageReference = storageRef(storage, `pdfs/Acta_${actaId}.pdf`);
    const downloadURL = await getDownloadURL(storageReference);

    // Abre una nueva ventana o descarga el archivo PDF
    window.open(downloadURL);

  } catch (error) {
    console.error('Error al descargar el PDF:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se encontro el PDF correspondiente al Acta', life: 4000 });

  }
}

async function importarPDF(actaId, archivo) {
  try {
    const storage = getStorage();
    const storageReference = storageRef(storage, `pdfs/Acta_${actaId}.pdf`);

    await uploadBytes(storageReference, archivo);

    toast.add({ severity: 'success', summary: 'PDF importado', detail: 'El PDF ha sido importado exitosamente', life: 4000 });
  } catch (error) {
    console.error('Error al importar el PDF:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al importar el PDF', life: 4000 });
  }
}


const exportarPDF = (data) => {
  store.exportarPDF(data)
};

</script>

<style scoped>
.contenedorSol {
  font-size: small;
  width: 1400px;
  height: auto;
  padding: 20px;
  border-radius: 20px;
  /* background: rgb(223, 223, 223); */
  margin-left: 150px;
  margin-top: 30px;
}

h1,
h2,
h4 {
  text-align: center;
}

.contenedorDt {
  font-size: small;
  /* width: auto;
    height: auto; */
  border-radius: 20px;
  background: rgb(236, 236, 236);
  padding: 20px;
}
</style>
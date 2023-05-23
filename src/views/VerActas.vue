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
          <Column field="id" header="id" :sortable="true" style="min-width:5rem " :sort-function="sortById">
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
                  <span class="p-button p-button-help "
                    @click="$event.target.previousElementSibling.click()">
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
              :value="filtrarOtrosActivos(activoSeleccionado.activos)" dataKey="id" :style="{ width: '500px' }">
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
            </div>

          </div>
          <p v-else>No se encontraron activos asociados.</p>

          <div v-if="activoSeleccionado"><br>
            <Button label="Descargar PDF" icon="pi pi-download" class="p-button-success p-button-rounded"
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
import html2pdf from 'html2pdf.js';

/* import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
 */
/* const storage = getStorage(); */
/* const archivoRef = storageRef(storage, 'ruta/del/archivo'); */
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
    // Mostrar mensaje de error al usuario si es necesario
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



async function exportarPDF(rowData) {
  try {
    const element = document.createElement('div');

    const logo = 'src/assets/logo.png'; // Ruta de la imagen del logo
    let titulo = ''; // Título del acta
    const fecha = rowData.fecha; // Fecha del acta
    const version = '1.0'; // Versión del acta

    let tipoActa = '';
    let parrafo = '';

    // Verifica el tipo de acta y establece el título correspondiente
    if (rowData.tipo === 'Entrega') {
      titulo = 'Acta de Entrega';
      parrafo = 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República, mediante el presente acto, hace entrega de equipamiento computacional a:';
    } else if (rowData.tipo === 'Devolución') {
      titulo = 'Acta de Devolución';
      parrafo = 'Mediante el presente acto, el usuario hace devolución del equipamiento computacional otorgado por el Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, los datos son los siguientes:';
    } else if (rowData.tipo === 'Orden de Salida') {
      titulo = 'Acta de Orden de Salida';
      parrafo = 'La Jefatura del Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República, mediante el presente acto, autoriza la salida de equipamiento computacional a:';
    }else if (rowData.tipo === 'Prestamo') {
      titulo = 'Acta de Préstamo de Equipamiento Computacional';
      parrafo = 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República, mediante el presente acto, hace préstamo del equipamiento computacional a:';
    }

    const encabezadoTabla = `
    <table style="width: 80%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;">
        <tr>
          <td style="text-align: center; vertical-align: middle;">
            <img src="${logo}" style="width: 100px;">
          </td>
          <td style="text-align: center; font-size: 18px; font-weight: bold; padding-bottom: 10px;">
            ${titulo}
          </td>
          <td style="text-align: right; font-size: 12px;">
            Fecha: ${fecha}<br>
            Versión: ${version}
          </td>
        </tr>
      </table>
    `;

    const motivoSalida = rowData.tipo === 'Orden de Salida' ? `
      <tr>
        <td> • Motivo Salida:</td>
        <td>${rowData.motivoSalida}</td>
      </tr>
    ` : '';

    const observaciones = rowData.observaciones ? `
      <tr>
        <td> • Observaciones:</td>
        <td>${rowData.observaciones}</td>
      </tr>
    ` : '';

    element.innerHTML = `
      <style>
        body {
          color: #000000;
          font-size: 12px;
          margin: 0;
        }

        table {
          border-collapse: collapse;
          margin-top: 10px;
        }

        table caption {
          font-weight: bold;
        }

        th {
          font-weight: bold;
          text-align: left;
        }

        th,
        td {
          padding: 5px;
          border: 1px solid;
          text-align: left;
        }

        .column {
          width: 20px;
        }
        p {
          margin-left: 80px; margin-right: 30px;"
        }
        
      </style>
      ${encabezadoTabla}
      <br>
      <p>${parrafo}</p>
      <br>
      <table style="width: 70%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;">
        <tr>
          <td> • ID del Acta:</td>
          <td>${rowData.id}</td>
        </tr>
        <tr>
          <td> • Sr.(a):</td>
          <td>${rowData.nombre}</td>
        </tr>
        <tr>
          <td> • Rut:</td>
          <td>${rowData.rut}</td>
        </tr>
        <tr>
          <td> • Firma:</td>
          <td></td>
        </tr>
        <tr>
          <td> • Dirección /Depto. /Unidad:</td>
          <td>${rowData.direccionSelec.nombre}</td>
        </tr>
        <tr>
          <td> • Cargo:</td>
          <td>${rowData.cargo}</td>
        </tr>
        <tr>
          <td> • Tipo:</td>
          <td>${rowData.tipo}</td>
        </tr>
        <tr>
          <td> • Fecha Acta:</td>
          <td>${rowData.fecha}</td>
        </tr>
        ${motivoSalida}
        ${observaciones}
      </table>
      <br>
      
    `;

    const computadorTable = filtrarComputadorEscritorioPortatil(rowData.activos);
    const otrosActivosTable = filtrarOtrosActivos(rowData.activos);

    if (computadorTable.length > 0) {
      const computadorTableHtml = `
        <table style="width: 70%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 100px;">
          <caption>EQUIPAMIENTO COMPUTACIONAL</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th style="width: 50px">Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Serie</th>
              <th>Nro Inventario</th>
              <th>Procesador</th>
              <th>RAM</th>
              <th>Disco Duro</th>
              <th>Lector/Grab DVD</th>
              <th>Teclado y Mouse</th>
            </tr>
          </thead>
          <tbody>
            ${computadorTable
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
      /*  */

      const softwareTableHtml = `
        <table style="width: 70%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 100px;">
          <caption>S.O.- OFIMÁTICA-SEGURIDAD</caption>
          <thead>
            <tr>
              <th>ID Activo</th>
              <th>MacOS</th>
              <th>Ms Office</th>
              <th>Ms Proyect</th>
              <th>Acrobat Reader</th>
              <th>SQL Server</th>
              <th>Photoshop</th>
              <th>Antivirus</th>
              
            </tr>
          </thead>
          <tbody>
            ${computadorTable
          .map(activo => `
                <tr>
                  <td>${activo.id}</td>
                  <td>${activo.macOS}</td>
                  <td>${activo.msOffice}</td>
                  <td>${activo.msProyect}</td>
                  <td>${activo.acrobatReader}</td>
                  <td>${activo.sqlServer}</td>
                  <td>${activo.photoshop}</td>
                  <td>${activo.av}</td>
                  
                </tr>

              `)
          .join('')}
          </tbody>
        </table>
        
      `;
      /*  */

      if (rowData.tipo === 'Entrega') {
        element.innerHTML += computadorTableHtml;
        element.innerHTML += softwareTableHtml;
      } else {
        element.innerHTML += computadorTableHtml;
      }


    }

    if (otrosActivosTable.length > 0) {
      const otrosActivosTableHtml = `
      <table style="width: 50%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;">
          <caption>Periféricos</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Serie</th>
              <th>Nro Inventario</th>
            </tr>
          </thead>
          <tbody>
            ${otrosActivosTable
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
      element.innerHTML += otrosActivosTableHtml;
    }

    // Crea el PDF con el contenido
    await html2pdf().from(element).save(`Acta_${rowData.id}.pdf`);
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
  }
}



</script>

<style scoped>
.contenedorSol {
  font-size: small;
  width: 1400px;
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
  /* width: auto;
    height: auto; */
  border-radius: 20px;
  background: rgb(236, 236, 236);
  padding: 20px;
}
</style>
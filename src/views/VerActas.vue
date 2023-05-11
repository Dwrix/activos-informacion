<template>
    <div class="contenedorSol">
        <h1>Actas</h1>
        <div class="contenedorDt">
            <div class="card">
                <DataTable ref="dt" :value="actas" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} activos">

                    <template #header>
                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                            <span class="p-input-icon-left">
                                <InputText v-model="filters['global'].value" placeholder="Busqueda" />
                                <i class="pi pi-search"></i>
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="id" header="id" sortable style="min-width:5rem"></Column>
                    <!-- <Column field="nombre" header="Nombre Equipo" sortable style="min-width:5rem"></Column> -->
                    <Column field="nombre" header="Nombre" sortable style="min-width:5rem"></Column>
                    <Column field="depto" header="Departamento" sortable style="min-width:5rem"></Column>
                    <Column field="tipo" header="Tipo" sortable style="min-width:5rem"></Column>
                    <Column field="fecha" header="Fecha Entrega" sortable style="min-width:5rem"></Column>
                    <Column :exportable="false" style="min-width:8rem" header="Actas">
                        <template #body="slotProps">
                            <Button @click="exportPDF()" label="Exportar"   outlined rounded class="mr-2" />
                            
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup >
import { ref, onMounted } from 'vue';
import { ListSolicitudes } from '@/service/ListSolicitudes';
import { FilterMatchMode } from 'primevue/api';
import jsPDF from "jspdf";

const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

onMounted(() => {
    ListSolicitudes.getSolicitudesData().then((data) => (actas.value = data));
});

const selectedActa = ref(null);
const actas = ref();

function exportPDF() {
  // Crea un nuevo documento PDF
  const doc = new jsPDF();

  // Agrega el contenido del PDF
  doc.text("Contenido del PDF", 10, 10); // Reemplaza "Contenido del PDF" con la información que deseas exportar

  // Descarga el PDF
  doc.save("archivo.pdf");
};

</script>

<style scoped>
.contenedorSol {
    font-size: small;
    width: 1000px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(223, 223, 223);
    margin-left: 180px;
    margin-top: -20px;
}


h1,
h2 {
    text-align: center;
}

.contenedorDt {
    width: 950px;
    height: 500px;
    border-radius: 20px;
    background: rgb(236, 236, 236);
    padding-left: 20px;
}
</style>
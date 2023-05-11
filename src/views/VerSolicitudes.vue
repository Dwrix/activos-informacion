<template>
    <div class="contenedorSol">
        <h1>Solicitudes</h1>
        <div class="contenedorDt">
            <div class="card">

                <DataTable ref="dt" :value="solicitudes" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} activos">

                    <template #header>
                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                            <!-- <h4 class="m-0">Buscar Solicitud</h4> -->
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Busqueda" />
                            </span>
                        </div>
                    </template>

                    <!-- <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column> -->
                    <Column field="id" header="id" sortable style="min-width:5rem"></Column>
                    <!-- <Column field="nombre" header="Nombre Equipo" sortable style="min-width:5rem"></Column> -->
                    <Column field="nombre" header="Nombre" sortable style="min-width:5rem"></Column>
                    <Column field="depto" header="Departamento" sortable style="min-width:5rem"></Column>
                    <Column field="tipo" header="Tipo" sortable style="min-width:5rem"></Column>
                    <Column field="fecha" header="Fecha Entrega" sortable style="min-width:5rem"></Column>
                    <Column :exportable="false" style="min-width:8rem" header="Actas">
                        <template #body="slotProps">
                            <Button label="Entrega" outlined rounded class="mr-2" @click="$router.push('/Entrega')" />

                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editarActivo(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmarEliminarActivo(slotProps.data)" /> -->
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { ListSolicitudes } from '@/service/ListSolicitudes'

const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
//data son los datos que se obtuvieron en el get solicitudes
onMounted(() => {
    ListSolicitudes.getSolicitudesData().then((data) => (solicitudes.value = data));
});

const solicitudes = ref();


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
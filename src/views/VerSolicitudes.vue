<template>
    <div class="contenedorSol">
        <h1>Solicitudes</h1>
        <div class="contenedorDt">
            <div class="card">
                <DataTable :value="solicitudes" tableStyle="min-width: 50rem">
                    <Column field="id" header="id"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="fecha" header="Fecha"></Column>
                    <Column field="acta" header="Acta">
                        <template #body>
                            <Button label="Entrega" class="mr-2" />
                        </template>
                    </Column>
                    
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
/*  import { ListSolicitudes } from '@/service/ListSolicitudes' */ 


/* onMounted(() => {
    ListSolicitudes.getSolicitudesData().then((data) => (products.value = data));
});  */

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
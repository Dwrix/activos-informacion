<template>
    <div class="contenedor">    
        <h1>Ver Actas</h1>
        <h3>Data table</h3>
        <!-- <div class="card">
        <DataTable :value="actas" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
        </div> -->


    </div>
</template>


<script setup lang="ts">
/* import { ref, onMounted } from 'vue';
import { ActaService } from '@/service/Actas';

onMounted(() => {
    ActaService.getProductsMini().then((data) => (actas.value = data));
});

const actas = ref(); */

</script>

<style scoped>

.contenedor{
    
    width: 550px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    margin-left: 180px;
    
}

h1{
    text-align: center;
}

</style>
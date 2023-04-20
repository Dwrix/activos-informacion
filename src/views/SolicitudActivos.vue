<template>
    <div class="contenedorSol">
        <h1>Solicitud de Activos</h1>
        <div class="contenedorDatosFunc">
            <h2>Datos del funcionario</h2>
            <div class="p-grid">
                <div class="p-col-6">
                    <span class="p-float-label">
                        <InputText id="rut" v-model="rut" class="p-inputtext-sm" />
                        <label for="rut">Rut</label>
                    </span>
                </div>
                <Dropdown v-model="selectedDir" :options="direccion" filter optionLabel="direccion"  
                placeholder="Dirección /Depto. /Unidad" class="custom-dropdown" >
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center">
                        <img :alt="slotProps.value.label"
                            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                        <div>{{ slotProps.value.name }}</div>
                    </div>
                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                </template>
                <template #option="slotProps">
                    <div class="flex align-items-center">
                        <img :alt="slotProps.option.label"
                            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
            </Dropdown>
                <div class="p-col-6">
                    <span class="p-float-label">
                        <InputText id="nombres" v-model="nombres" class="p-inputtext-sm" />
                        <label for="nombres">Nombres</label>
                    </span>
                </div>
                <!-- <div class="p-col-6">
                    <span class="p-float-label">
                        <InputText id="direccion" v-model="o" class="p-inputtext-sm" />
                        <label for="direccion">Dirección</label>
                    </span>
                </div> -->
                <div class="p-col-6">
                    <span class="p-float-label">
                        <InputText id="Apellidos" v-model="apellidos" class="p-inputtext-sm" />
                        <label for="apellidos">Apellidos</label>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rut = ref(null);
const nombres = ref(null);
const apellidos = ref(null);

const selectedDir = ref();
const direccion = ref([
    { name: 'Departamento de Finanzas', code: 'DF' },
    { name: 'Servicios Generales', code: 'SV' },
    { name: 'Dirección de Gestion Ciudadana', code: 'DGC' },
   
]);

</script>

<style scoped>

.contenedorSol {
    font-size: small;
    width: 800px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(223, 223, 223);
    margin-left: 180px;
    margin-top: -20px;
}

.p-float-label {
    margin-top: 10px;
}

h1,
h2 {
    text-align: center;
}

.contenedorDatosFunc {
    width: 700px;
    border-radius: 20px;
    background: rgb(236, 236, 236);
    padding-left: 20px;
}

.p-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
}
</style>
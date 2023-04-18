<template>
    <div class="contenedor">
        <h1>Form Entrega de Activos</h1>
        <p>El departamento de Tecnologías de la informaciòn y la Comunicación (TIC) de la Presidencia
            de la Republica, hace entrega del equipamiento computacional a:
        </p>
        <div class="formulario">
            <span class="p-float-label">
                <InputText id="nombre" v-model="nombre" />
                <label for="nombre">Nombre</label>
            </span><br>
            <span class="p-float-label">
                <InputText id="rut" v-model="rut" />
                <label for="rut">Rut</label>
            </span><br>

            <Dropdown v-model="selectedDir" :options="direccion" filter optionLabel="direccion"
                placeholder="Dirección /Depto. /Unidad" class="w-full md:w-14rem">
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
            <br><br>
            <span class="p-float-label">
                <InputText id="cargo" v-model="cargo" />
                <label for="cargo">Cargo</label>
            </span><br>
            <Calendar v-model="date" showIcon disabled/><br><br>

            <Button label="Enviar" icon="pi pi-check" iconPos="right" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const nombre = ref(null);
const rut = ref(null);
const cargo = ref(null);
const date = ref(new Date());
setInterval(() => {
  date.value = new Date(); // Actualizar la fecha cada 1000 milisegundos (1 segundo) 1 hora
}, 3600000 );

const selectedDir = ref();
const direccion = ref([
    { name: 'Departamento de Finanzas', code: 'DF' },
    { name: 'Servicios Generales', code: 'SV' },
    { name: 'Dirección de Gestion Ciudadana', code: 'DGC' },
   
]);

</script>

<style scoped>
.contenedor{
    width: 450px;
    height: auto;
    padding: 20px;
    margin: -30px auto 0 auto;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    
    
}

.formulario{
    margin-top: 20px;
}



</style>


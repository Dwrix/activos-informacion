<template>
    <div class="contenedor">
        <h1>Entrega de Activos</h1>
        <p>El departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia
            de la Republica, hace entrega del equipamiento computacional a:
        </p>
        <div class="formulario">

            <span class="p-float-label">
                <InputText id="nombre" v-model="acta.nombre" />
                <label for="nombre">Nombre</label>
            </span><br>
            <span class="p-float-label">
                <InputText id="rut" v-model="acta.rut" />
                <label for="rut">Rut</label>
            </span><br>

            <Dropdown v-model="acta.direccionSelec" :options="direccion" filter optionLabel="direccion"
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
                <InputText id="cargo" v-model="acta.cargo" />
                <label for="cargo">Cargo</label>
            </span><br>
            <Calendar v-model="date" showIcon disabled /><br><br>

        </div>
    </div>
    <!-- <button @click="enviar">Enviar</button> -->

    <Toast />

    <Equipamiento></Equipamiento>
</template>


<script setup>
import { ref } from 'vue';
/* import { ActivoService } from '@/service/ActivoService'; */
import Equipamiento from '@/components/Equipamiento.vue';

/* import { useStore } from '@/stores/store'

const store = useStore() */


const acta = ref({});
/* const rut = ref(null);
const cargo = ref(null); */
const date = ref(new Date());
window.addEventListener('load', () => {
    date.value = new Date();
});

/* const direccionSelec = ref(); */
const direccion = ref([
    { nombre: 'Departamento de Finanzas', code: 'DF' },
    { nombre: 'Servicios Generales', code: 'SV' },
    { nombre: 'Dirección de Gestion Ciudadana', code: 'DGC' },

]);



const enviar = () => {
    console.log(store.inputs)
    console.log(store.activos)
    store.inputs = {
        nombre: '',
        rut: '',
        direccionSelec: '',
        cargo: '',
        date: '',
        // Aquí estableces los valores iniciales de tus inputs en FormEntrega.vue
    }
    store.activos = []

    // Tu lógica adicional para generar el Acta
}

</script>

<style scoped>
.contenedor {

    width: 1000px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    margin-left: 180px;
    margin-top: -20px;

}

.formulario {
    margin-top: 20px;

}
</style>


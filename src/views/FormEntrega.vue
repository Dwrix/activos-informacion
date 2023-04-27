<template>
    <div class="contenedor">
        <h1>Form Entrega de Activos</h1>
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

            <Dropdown v-model="acta.selectedDir" :options="direccion" filter optionLabel="direccion"
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
    <!-- ------------------------------------- -->
    <!-- ------------------------------------- -->
    <!-- ------------------------------------- -->
    
    <Toast />
    <Equipamiento></Equipamiento>
    <!-- N -->
</template>

<script setup >
import { ref, onMounted } from 'vue';

/* import { ProductService } from '@/service/ProductService'; */
import Equipamiento from '@/components/Equipamiento.vue';

const acta = ref({});

/* const nombre = ref(null);
const rut = ref(null);
const cargo = ref(null); */
const date = ref(new Date());
window.addEventListener('load', () => {
    date.value = new Date();
});

/* const selectedDir = ref(); */
const direccion = ref([
    { name: 'Departamento de Finanzas', code: 'DF' },
    { name: 'Servicios Generales', code: 'SV' },
    { name: 'Dirección de Gestion Ciudadana', code: 'DGC' },

]);
/* ----------------------------------- */



/* 
onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
}); */

const enviar = () => {
    /* console.log('enviar') */
    console.log(acta)
};

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

/* equipamiento */
.contenedorEquipamiento {
    width: 1000px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    margin-left: 180px;
    margin-top: -20px;
}

.formgrid {
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.contenedorGeneral input {
    width: 200px;
}

.contenedorPadre {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* define dos columnas de igual tamaño */
    grid-gap: 20px;
    /* define un espacio entre las dos columnas */
}

.contenedorGeneral {
    display: grid;
    display: block;
    grid-template-columns: repeat(2, 1fr);
    /* define dos columnas de igual tamaño */
    grid-gap: 10px;
    /* define un espacio entre las dos columnas */
}

.ContenedorPcs {
    display: grid;
    display: block;
    float: none;
    grid-template-columns: repeat(2, 1fr);
    /* define dos columnas de igual tamaño */
    grid-gap: 10px;
    /* define un espacio entre las dos columnas */
}

/* equipamiento */
</style>


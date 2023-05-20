<template>
    <div class="contenedor">
        <h1>Entrega de Activos</h1>
        <p>El departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia
            de la Republica, hace entrega del equipamiento computacional a:
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="formulario">

                <span class="p-float-label">
                    <InputText id="nombre" v-model="store.acta.nombre" />
                    <label for="nombre">Nombre</label>
                </span><br>
                <span class="p-float-label">
                    <InputText id="rut" v-model="store.acta.rut" />
                    <label for="rut">Rut</label>
                </span><br>

                <Dropdown v-model="store.acta.direccionSelec" :options="direccion" filter optionLabel="nombre"
                    placeholder="Dirección /Depto. /Unidad" class="w-full md:w-14rem" style="padding: 0rem;">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center">
                            <img :alt="slotProps.value.label"
                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px; " />
                            <div>{{ slotProps.value.nombre }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <img :alt="slotProps.option.label"
                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; " />
                            <div>{{ slotProps.option.nombre }}</div>
                        </div>
                    </template>
                </Dropdown>
                <br><br>
                <span class="p-float-label">
                    <InputText id="cargo" v-model="store.acta.cargo" />
                    <label for="cargo">Cargo</label>
                </span><br>
                <span class="p-float-label">
                    <InputText id="encargado" v-model="store.acta.encargado" />
                    <label for="encargado">Encargado</label>
                </span><br>
                <Calendar v-model="store.acta.fecha" showIcon disabled /><br><br>

                <span class="p-float-label">
                    <Textarea v-model="store.acta.observaciones" rows="2" cols="30" />
                    <label>Observaciones</label>
                </span>

            </div>
            <!-- <button type="submit">Guardar</button> -->

        </form>
    </div>
    <!-- <button @click="enviar">Enviar</button> -->

    <Toast />

    <Equipamiento></Equipamiento>
</template>


<script setup>
import { ref } from 'vue';
/* import { ActivoService } from '@/service/ActivoService'; */
import Equipamiento from '@/components/Equipamiento.vue';
/* import { useStore } from 'pinia' */
import { useActaStore } from '@/stores/store'
/* import db from '../firebase'; */

const store = useActaStore()


store.acta.tipo = "Entrega"

/* const direccionSelec = ref();*/
const direccion = ref([
    { nombre: 'Departamento de Finanzas', code: 'DF' },
    { nombre: 'Servicios Generales', code: 'SV' },
    { nombre: 'Dirección de Gestion Ciudadana', code: 'DGC' },

]);


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


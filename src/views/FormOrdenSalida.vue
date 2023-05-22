<template>
    <div class="contenedor">
        <h1>Orden de Salida</h1>
        <p>La Jefatura del Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia
            de la Republica, <b>autoriza</b> la salida del equipamiento computacional a:
        </p>
        <div class="formulario p-grid">
            <div class="p-col-6 p-md-6">
                <span class="p-float-label">
                    <InputText id="nombre" v-model="store.acta.nombre" />
                    <label for="nombre">Nombre</label>
                </span><br>
                <span class="p-float-label">
                    <InputText id="rut" v-model="store.acta.rut" />
                    <label for="rut">Rut</label>
                </span><br>
                <div class="p-col-12">
                    <Dropdown v-model="store.acta.direccionSelec" :options="direccion" filter optionLabel="nombre"
                        placeholder="Dirección /Depto. /Unidad" class="w-full md:w-14rem">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <img :alt="slotProps.value.label"
                                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
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
                                    :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                <div>{{ slotProps.option.nombre }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>

                <br>
                <span class="p-float-label">
                    <InputText id="cargo" v-model="store.acta.cargo" />
                    <label for="cargo">Cargo</label>
                </span><br>
            </div>
            <div class="p-col-6 p-md-6 p-col-right">
                <span class="p-float-label">
                    <Calendar v-model="store.acta.fecha" showIcon disabled />
                </span><br>
                <span class="p-float-label">
                    <InputText id="encargado" v-model="store.acta.encargado" />
                    <label for="encargado">Encargado</label>
                </span><br>
                <span class="p-float-label ">
                    <Textarea v-model="store.acta.motivoSalida" rows="2" cols="30" />
                    <label>Motivo Salida</label>
                </span><br>
                <span class="p-float-label">
                    <Textarea v-model="store.acta.observaciones" rows="2" cols="30" />
                    <label>Observaciones</label>
                </span>
            </div>
        </div>

    </div>

    <Equipamiento></Equipamiento>
</template>

<script setup>
import { ref } from 'vue';
import Equipamiento from '@/components/Equipamiento.vue';
import { useActaStore } from '@/stores/store'

const store = useActaStore()

/* const nombre = ref(null);
const rut = ref(null);
const cargo = ref(null);
const date = ref(new Date());

window.addEventListener('load', () => {
    date.value = new Date();
}); */
/* setInterval(() => {
  date.value = new Date(); 
}, 3600000 );
// Actualizar la fecha cada 1000 milisegundos 1 segundo  */

/* const encargado = ref();
const motivoSalida = ref(''); */

store.acta.tipo = "Orden de Salida"
const selectedDir = ref();
const direccion = ref([
    { nombre: 'Auditoría Interna', code: '1' },
    { nombre: 'Abastecimiento', code: '2' },
    { nombre: 'Planificación y control de gestión', code: '3' },
    { nombre: 'Tecnologías de la información y la comunicación (TIC)', code: '4' },
    { nombre: 'Finanzas', code: '5' },
    { nombre: 'Gestión de las personas', code: '6' },
    { nombre: 'Jurídico', code: '7' },
    { nombre: 'Logística', code: '8' },
    { nombre: 'Patrimonio Cultural', code: '9' },
    { nombre: 'Repostero Presidencial y casino general', code: '10' },
    { nombre: 'Dirección administrativa', code: '11' },
    { nombre: 'Dirección de gestión ciudadana', code: '12' },
    { nombre: 'Dirección de políticas públicas', code: '13' },
    { nombre: 'Dirección de prensa y fotografía', code: '14' },
    { nombre: 'Dirección de Programación', code: '15' },
    { nombre: 'Dirección socio cultural', code: '16' },
    { nombre: 'Gabinete Presidencial', code: '17' },
    { nombre: 'Memoria presidencial', code: '18' },
    { nombre: 'Residencia presidencial palacio cerro castillo', code: '19' },
    { nombre: 'Subdirección administrativa', code: '20' },
    { nombre: 'Subvención presidencial', code: '21' },
    { nombre: 'Seguridad presidencial', code: '22' },
    { nombre: 'Gabinete primera dama', code: '23' },
    { nombre: 'Sistema gestión de la calidad', code: '24' },
    { nombre: 'Dirección de estudios', code: '25' },
    

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

.p-grid {
    display: flex;
    flex-wrap: wrap;
}

.p-col-6 {
    width: 50%;
}

.p-col-right {
    margin-left: auto;
}

.p-col-right .p-field {
    display: block;
    margin-bottom: 1rem;
}


</style>
<template>
    <div class="contenedor">
        <h2>Préstamo de Equipamiento Computacional</h2><br>
        <p>El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República,
            mediante el presente acto, hace préstamo del equipamiento computacional a:
        </p>
        <div class="formulario p-grid">
            <div class="p-col-6 p-md-6">
                <span class="p-float-label">
                    <InputText id="nombre" v-model="store.acta.nombre" />
                    <label for="nombre">Nombre Receptor</label>
                </span><br>
                <span class="p-float-label">
                    <InputText id="rut" v-model="store.acta.rut" />
                    <label for="rut">Rut Receptor</label>
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
                    <label for="cargo">Cargo Receptor</label>
                </span><br>
                <span class="p-float-label">
                    <Textarea v-model="store.acta.observaciones" rows="2" cols="30" />
                    <label>Observaciones</label>
                </span>
            </div>
            <div class="p-col-6 p-md-6 p-col-right">
                <label for="fechaEntregaPrestamo">Fecha del préstamo</label>
                <span class="p-float-label">
                    <Calendar v-model="store.acta.fechaEntregaPrestamo" showIcon />
                </span><br>
                <label>Fecha de la devolución</label><br>

                <Calendar v-model="store.acta.fechaDevolucionPrestamo" showIcon />
                <br>
                <label>Nombre persona que autoriza el préstamo</label>

                <InputText id="encargado" v-model="store.acta.encargado" />

                <br>
                <label for="nombreGestion">Nombre persona que gestiona entrega y retorno</label>
                <span class="p-float-label">

                    <InputText id="nombreGestion" v-model="store.acta.nombreGestion" />
                    <label for="nombreGestion"></label>
                </span><br>


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



store.acta.tipo = "Prestamo"
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
<template>
    <div class="contenedor">
        <h2>Devolución de Activos</h2>
        <p>El usuario hace devolución del equipamiento computacional otorgado por El departamento de Tecnologías de la
            información y la Comunicación (TIC) de la Presidencia
            de la Republica, los datos son los siguientes:</p>
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
                    <Dropdown v-model="store.acta.direccionSelec" :options="store.direccionOpciones" filter optionLabel="nombre"
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
                    <InputText id="encargado" v-model="store.acta.encargado" />
                    <label for="encargado">Encargado</label>
                </span><br>

                <Calendar v-model="store.acta.fecha" showIcon disabled /><br><br>

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
import Equipamiento from '@/components/Equipamiento.vue';
import { useActaStore } from '@/stores/store'

const store = useActaStore()

store.acta.tipo = "Devolución"


</script>

<style scoped>
.contenedor {
    width: 1000px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    margin-left: 170px;
    margin-top: 50px;

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
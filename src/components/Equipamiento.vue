<template>
    <div class="contenedorEquipamiento">
        <div class="card">
            <h4>Agregar Equipamiento</h4>
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Agregar" icon="pi pi-plus" severity="success" class="mr-2" @click="abrirDialog" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmarEliminarSelec"
                        :disabled="!activosSeleccionados || !activosSeleccionados.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="activos" v-model:selection="activosSeleccionados" dataKey="id" :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} activos">

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="id" sortable style="min-width:5rem"></Column>
                <Column field="tipo" header="Tipo" sortable style="min-width:5rem"></Column>
                <Column field="marca" header="Marca" sortable style="min-width:5rem"></Column>
                <Column field="modelo" header="Modelo" sortable style="min-width:5rem"></Column>
                <Column field="serie" header="Serie" sortable style="min-width:5rem"></Column>
                <Column field="numInv" header="Num Inventario" sortable style="min-width:10rem"></Column>

                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editarActivo(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmarEliminarActivo(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="activoDialog" :style="{ width: '600px' }" header="Agregar Equipamiento" :modal="true"
            class="p-fluid">
            <h4>Tipo Equipamiento </h4>
            <div class="formgrid grid">
                <div class="grid-column">
                    <label>Equipamiento Computacional</label>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo1" name="tipo" value="Computador Escritorio" v-model="activo.tipo" />
                        <label for="tipo1"> Computador Escritorio</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo2" name="tipo" value="Computador Portatil" v-model="activo.tipo" />
                        <label for="tipo2"> Computador Portatil</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo3" name="tipo" value="Impresora" v-model="activo.tipo" />
                        <label for="tipo3"> Impresora</label>
                    </div>
                </div>
                <div class="grid-column">
                    <label>Periféricos</label>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo4" name="tipo" value="Escaner" v-model="activo.tipo" />
                        <label for="tipo4"> Escaner</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo5" name="tipo" value="Monitor" v-model="activo.tipo" />
                        <label for="tipo5"> Monitor</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo6" name="tipo" value="Proyector" v-model="activo.tipo" />
                        <label for="tipo6"> Proyector</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo7" name="tipo" value="Otro" v-model="activo.tipo" />
                        <label for="tipo7"> Otro</label>
                    </div>
                </div>
            </div><br>

            <div class="contenedorPadre">
                <div class="contenedorGeneral">
                    <div class="field">
                        <label for="marca">Marca</label>
                        <InputText id="marca" v-model.trim="activo.marca" required="true"
                            :class="{ 'p-invalid': submitted && !activo.marca }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !activo.marca">marca es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="modelo">Modelo</label>
                        <InputText id="modelo" v-model.trim="activo.modelo" required="true"
                            :class="{ 'p-invalid': submitted && !activo.modelo }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !activo.modelo">modelo es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="serie">Serie</label>
                        <InputText id="serie" v-model.trim="activo.serie" required="true"
                            :class="{ 'p-invalid': submitted && !activo.serie }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !activo.modelo">serie es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="numInv">Número Inventario</label>
                        <InputText id="numInv" v-model.trim="activo.numInv"
                            :class="{ 'p-invalid': submitted && !activo.numInv }" style="display: block;" />
                    </div><br>

                </div>
                <div class="ContenedorPcs"
                    v-if="activo.tipo === 'Computador Escritorio' || activo.tipo === 'Computador Portatil'">

                    <div class="field">
                        <label for="procesador">Procesador</label>
                        <InputText id="procesador" v-model.trim="activo.procesador"
                            :class="{ 'p-invalid': submitted && !activo.procesador }" />
                    </div>

                    <div class="field">
                        <label for="ram">Memoria RAM</label>
                        <InputText id="ram" v-model.trim="activo.ram" :class="{ 'p-invalid': submitted && !activo.ram }" />
                    </div>

                    <div class="field">
                        <label for="discoDuro">Disco Duro</label>
                        <InputText id="discoDuro" v-model.trim="activo.discoDuro"
                            :class="{ 'p-invalid': submitted && !activo.discoDuro }" />
                    </div>

                    <div class="field">
                        <label for="tarjetavideo">Tarjeta de Video</label>
                        <InputText id="tarjetavideo" v-model.trim="activo.tarjetavideo"
                            :class="{ 'p-invalid': submitted && !activo.tarjetavideo }" />
                    </div>

                    <div class="formgrid grid">
                        <div class="field-radiobutton col-6">
                            <label> Lector/Grabador de DVD </label><br>
                            <RadioButton id="dvdSi" name="dvd" value="Si" v-model="activo.dvd" />
                            <label for="dvdSi"> Si </label>
                            <RadioButton id="dvdNo" name="dvd" value="No" v-model="activo.dvd" />
                            <label for="dvdNo"> No </label>

                        </div><br>
                        <div class="field-radiobutton col-6">
                            <label> Teclado y Mouse</label>
                            <RadioButton id="tecladoMousesi" name="tecladoMouse" value="Si" v-model="activo.tecladoMouse" />
                            <label for="tecladoMousesi"> Si </label>
                            <RadioButton id="tecladoMouseNo" name="tecladoMouse" value="No" v-model="activo.tecladoMouse" />
                            <label for="tecladoMouseNo"> No </label>

                        </div>

                    </div>

                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="cerrarDialog" />
                <Button label="Agregar" icon="pi pi-check" text @click="guardarActivo" />
            </template>
        </Dialog>

        <Dialog v-model:visible="eliminarActivoDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="activo"> Estas seguro que quieres eliminar <b>{{ activo.tipo }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="eliminarActivoDialog = false" />
                <Button label="Si" icon="pi pi-check" text @click="eliminarActivo" />
            </template>
        </Dialog>

        <Dialog v-model:visible="eliminarActivosDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="activo"> Estas seguro que quieres eliminar los activos seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="eliminarActivosDialog = false" />
                <Button label="Si" icon="pi pi-check" text @click="eliminarActivosSelec" />
            </template>
        </Dialog><br>

        <div class="card flex justify-content-center">
            <Button label="Enviar" icon="pi pi-check" iconPos="right" @click="enviar" />
        </div>
    </div>
    <Toast />

   
</template>

<script setup >
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ActivoService } from '@/service/ActivoService'; 

/* import FormEntrega from '@/views/FormEntrega.vue';
import FormDevolucion from '@/views/FormDevolucion.vue';
import OrdenSalida from '@/views/FormOrdenSalida.vue';
const limpiarForm = ref(false);

  const enviarFormulario = () => {
    limpiarForm.value = true;
    // 
  }; */
/* ----------------------------------- */

/* ----------------------------------- */

const dt = ref();
const activos = ref();
const activoDialog = ref(false);
const eliminarActivoDialog = ref(false);
const eliminarActivosDialog = ref(false);
const activo = ref({});
const activosSeleccionados = ref();
const activoSeleccionado = ref(null);
const toast = useToast();
const submitted = ref(false);

onMounted(() => {
    ActivoService.getActivos().then((data) => (activos.value = data));
});



const abrirDialog = () => {
    activo.value = {};
    submitted.value = false;
    activoDialog.value = true;
};
const cerrarDialog = () => {
    activoDialog.value = false;
    submitted.value = false;
};
const guardarActivo = () => {
    submitted.value = true;

    if (activo.value.tipo.trim()) {
        if (activo.value.id) {
            activos.value[findIndexById(activo.value.id)] = activo.value;
            toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Modificado', life: 4000 });

        }
        else {
            activo.value.id = createId();
            /* activo.value.code = createId(); */
            activos.value.push(activo.value);
            toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Agregado', life: 4000 });

        }

        activoDialog.value = false;
        activo.value = {};
    }
};
const editarActivo = (prod) => {
    activo.value = { ...prod };
    activoSeleccionado.value = prod;
    activoDialog.value = true;

};

const confirmarEliminarActivo = (prod) => {
    activo.value = prod;
    eliminarActivoDialog.value = true;
};
const eliminarActivo = () => {
    activos.value = activos.value.filter(val => val.id !== activo.value.id);
    eliminarActivoDialog.value = false;
    activo.value = {};
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Eliminado', life: 4000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < activos.value.length; i++) {
        if (activos.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

const confirmarEliminarSelec = () => {
    eliminarActivosDialog.value = true;
};
const eliminarActivosSelec = () => {
    activos.value = activos.value.filter(val => !activosSeleccionados.value.includes(val));
    eliminarActivosDialog.value = false;
    activosSeleccionados.value = null;
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activos Eliminados', life: 4000 });
};


const enviar = () => {
    console.log(activos)
    activos.value = [];
    dt.value = '';

    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha generado el Acta', life: 4000 });


};


</script>

<style scoped>
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



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

            <DataTable ref="dt" :value="store.listaActivos" v-model:selection="activosSeleccionados" dataKey="id"
                :paginator="true" :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} activos">

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="id" sortable style="min-width:5rem"></Column>
                <!-- <Column field="nombre" header="Nombre Equipo" sortable style="min-width:5rem"></Column> -->
                <Column field="tipo" header="Tipo" sortable style="min-width:5rem"></Column>
                <Column field="marca" header="Marca" sortable style="min-width:5rem"></Column>
                <Column field="modelo" header="Modelo" sortable style="min-width:5rem"></Column>
                <Column field="serie" header="Serie" sortable style="min-width:5rem"></Column>
                <Column field="numInv" header="Nro Inventario" sortable style="min-width:10rem"></Column>

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
                        <RadioButton id="tipo1" name="tipo" value="Computador Escritorio" v-model="store.activo.tipo" />
                        <label for="tipo1"> Computador Escritorio</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo2" name="tipo" value="Computador Portatil" v-model="store.activo.tipo" />
                        <label for="tipo2"> Computador Portatil</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo3" name="tipo" value="Impresora" v-model="store.activo.tipo" />
                        <label for="tipo3"> Impresora</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo8" name="tipo" value="Tablet" v-model="store.activo.tipo" />
                        <label for="tipo8"> Tablet</label>
                    </div>
                </div>
                <div class="grid-column">
                    <label>Periféricos</label>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo4" name="tipo" value="Escaner" v-model="store.activo.tipo" />
                        <label for="tipo4"> Escaner</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo5" name="tipo" value="Monitor" v-model="store.activo.tipo" />
                        <label for="tipo5"> Monitor</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo6" name="tipo" value="Proyector" v-model="store.activo.tipo" />
                        <label for="tipo6"> Proyector</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo9" name="tipo" value="Lector" v-model="store.activo.tipo" />
                        <label for="tipo9"> Lector </label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo7" name="tipo" value="Otro" v-model="store.activo.tipo" />
                        <label for="tipo7"> Otro</label>
                    </div>
                    <div class="field" v-if="store.activo.tipo === 'Otro'">
                        <label for="tipoOtro"></label>
                        <InputText id="tipoOtro" v-model="store.activo.tipoOtro" />
                    </div>
                </div>
            </div><br>

            <div class="contenedorDialog">
                <div class="contenedorGeneral">

                    <div class="field">
                        <label for="marca">Marca</label>
                        <InputText id="marca" v-model.trim="store.activo.marca" required="true"
                            :class="{ 'p-invalid': agregar && !store.activo.marca }" style="display: block;" />
                        <small class="p-error" v-if="agregar && !store.activo.marca">marca es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="modelo">Modelo</label>
                        <InputText id="modelo" v-model.trim="store.activo.modelo" required="true"
                            :class="{ 'p-invalid': agregar && !store.activo.modelo }" style="display: block;" />
                        <small class="p-error" v-if="agregar && !store.activo.modelo">modelo es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="serie">Serie</label>
                        <InputText id="serie" v-model.trim="store.activo.serie" required="true"
                            :class="{ 'p-invalid': agregar && !store.activo.serie }" style="display: block;" />
                        <small class="p-error" v-if="agregar && !store.activo.serie">serie es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="numInv">Número Inventario</label>
                        <InputText id="numInv" v-model.trim="store.activo.numInv"
                            :class="{ 'p-invalid': agregar && !store.activo.numInv }" style="display: block;" />
                    </div><br>

                    <div class="ContOfiSeguridad"
                        v-if="store.acta.tipo === 'Entrega' && (store.activo.tipo === 'Computador Escritorio' || store.activo.tipo === 'Computador Portatil')">
                        <div class="ofiSeguridad">
                            <label> S.O.- OFIMÁTICA-SEGURIDAD </label><br>

                            <div class="checkbox-row">
                                <div class="checkbox-col">
                                    <label class="checkbox-label">MacOS</label>
                                    <input type="checkbox" id="macOS" v-model="store.activo.macOS" />
                                </div>

                                <div class="checkbox-col">
                                    <label class="checkbox-label">MS OFFICE</label>
                                    <input type="checkbox" id="msOffice" v-model="store.activo.msOffice" />
                                </div>

                                <div class="checkbox-col">
                                    <label class="checkbox-label">MS PROYECT</label>
                                    <input type="checkbox" id="msProyect" v-model="store.activo.msProyect" />
                                </div>

                                <div class="checkbox-col">
                                    <label class="checkbox-label">ACROBAT READER</label>
                                    <input type="checkbox" id="acrobatReader" v-model="store.activo.acrobatReader" />
                                </div>

                                <div class="checkbox-col">
                                    <label class="checkbox-label">SQL SERVER</label>
                                    <input type="checkbox" id="sqlServer" v-model="store.activo.sqlServer" />
                                </div>

                                <div class="checkbox-col">
                                    <label class="checkbox-label">PHOTOSHOP</label>
                                    <input type="checkbox" id="photoshop" v-model="store.activo.photoshop" />
                                </div>

                                <div class="checkbox-col">
                                    <label class="checkbox-label">ANTIVIRUS</label>
                                    <input type="checkbox" id="av" v-model="store.activo.av" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="ContenedorPcs"
                    v-if="store.activo.tipo === 'Computador Escritorio' || store.activo.tipo === 'Computador Portatil'">

                    <div class="field">
                        <label for="nombreEquipo">Nombre Equipo</label>
                        <InputText id="nombreEquipo" v-model.trim="store.activo.nombreEquipo" required="true"
                            :class="{ 'p-invalid': agregar && !store.activo.nombreEquipo }" style="display: block;" />
                        <small class="p-error" v-if="agregar && !store.activo.nombreEquipo">nombre es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="procesador">Procesador</label>
                        <InputText id="procesador" v-model.trim="store.activo.procesador"
                            :class="{ 'p-invalid': agregar && !store.activo.procesador }" />
                    </div>

                    <div class="field">
                        <label for="ram">Memoria RAM</label>
                        <InputText id="ram" v-model.trim="store.activo.ram"
                            :class="{ 'p-invalid': agregar && !store.activo.ram }" />
                    </div>

                    <div class="field">
                        <label for="discoDuro">Disco Duro</label>
                        <InputText id="discoDuro" v-model.trim="store.activo.discoDuro"
                            :class="{ 'p-invalid': agregar && !store.activo.discoDuro }" />
                    </div>

                    <div class="field">
                        <label for="tarjetavideo">Tarjeta de Video</label>
                        <InputText id="tarjetavideo" v-model.trim="store.activo.tarjetavideo"
                            :class="{ 'p-invalid': agregar && !store.activo.tarjetavideo }" />
                    </div>

                    <div class="formgrid grid">
                        <div class="field-radiobutton col-6">
                            <label> Lector/Grabador de DVD </label><br>
                            <RadioButton id="dvdSi" name="dvd" value="Si" v-model="store.activo.dvd" />
                            <label for="dvdSi"> Si </label>
                            <RadioButton id="dvdNo" name="dvd" value="No" v-model="store.activo.dvd" />
                            <label for="dvdNo"> No </label>

                        </div><br>
                        <div class="field-radiobutton col-6">
                            <label> Teclado y Mouse</label><br>
                            <RadioButton id="tecladoMousesi" name="tecladoMouse" value="Si"
                                v-model="store.activo.tecladoMouse" />
                            <label for="tecladoMousesi"> Si </label>
                            <RadioButton id="tecladoMouseNo" name="tecladoMouse" value="No"
                                v-model="store.activo.tecladoMouse" />
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
                <span v-if="store.activo"> Estas seguro que quieres eliminar <b>{{ store.activo.tipo }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="eliminarActivoDialog = false" />
                <Button label="Si" icon="pi pi-check" text @click="eliminarActivo" />
            </template>
        </Dialog>

        <Dialog v-model:visible="eliminarActivosDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="store.activo"> Estas seguro que quieres eliminar los activos seleccionados?</span>
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
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useActaStore } from '@/stores/store'


const store = useActaStore()


const dt = ref();
/* const activos = ref(); */
const activoDialog = ref(false);
const eliminarActivoDialog = ref(false);
const eliminarActivosDialog = ref(false);
const activosSeleccionados = ref();
const activoSeleccionado = ref(null);
const toast = useToast();
const agregar = ref(false);


const abrirDialog = () => {
    store.activo.value = {};
    agregar.value = false;
    activoDialog.value = true;
    /* otroSeleccionado.value = false; */

};

const cerrarDialog = () => {
    activoDialog.value = false;
    agregar.value = false;
};

const guardarActivo = () => {
    agregar.value = true;

    //Si la propiedad tipo no está definida o está vacía, se muestra el toast de error
    if (!store.activo.tipo || !store.activo.tipo.trim()) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Por favor selecciona un tipo', life: 4000 });
        return;
    }

    //llama la func findIndexById encontrar el índice de un elemento en la lista listaActivos que tiene un valor de id igual al id del objeto 
    //activo actual en la store. El resultado se almacena en una variable index.
    const index = findIndexById(store.activo.id);

    //Comprueba si index es mayor que -1, lo que significa que se encontró un elemento con el mismo id en la lista listaActivos
    //si es asi se edita
    if (index > -1) {
        store.listaActivos[index] = store.activo;
        toast.add({
            severity: 'success', summary: 'Exitoso', detail: 'Activo Modificado', life: 4000
        });

        //Si index es menor que 0, no se encontró un elemento con el mismo id en la lista listaActivos, por lo cual se agrega uno nuevo
    } else {
        store.activo.id = createId();
        store.listaActivos.push(store.activo);
        toast.add({
            severity: 'success', summary: 'Exitoso', detail: 'Activo Agregado', life: 4000
        });
    }

    activoDialog.value = false;
    //para que cuando se abra el dialog denuevo esten los campos vacios
    store.activo = {};

};

//se utiliza para seleccionar un objeto activo específico de la lista listaActivos en la store, crear una copia de ese objeto y establecerla como el objeto activo actual en la store
const editarActivo = (act) => {
    //Establece el objeto activo actual en la store como una copia del objeto act que se pasa como argumento a la función. La sintaxis { ...act } 
    //se utiliza para crear una copia superficial del objeto act,
    // lo que significa que se crea un nuevo objeto que tiene las mismas propiedades que act, pero que no está conectado directamente a act.
    store.activo = { ...act };
    activoSeleccionado.value = act;
    activoDialog.value = true;

};

const confirmarEliminarActivo = (act) => {
    store.activo.value = act;
    eliminarActivoDialog.value = true;
};
const eliminarActivo = () => {
    store.listaActivos = store.listaActivos.filter(val => val.id !== store.activo.value.id);
    eliminarActivoDialog.value = false;
    store.activo.value = {};
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Eliminado', life: 4000 });
};

const findIndexById = (id) => {
    //let index = -1; - Inicializa la variable index en -1 como valor predeterminado. 
    //Esto se hace porque si no se encuentra ningún objeto con el ID dado en la lista listaActivos, se debe devolver -1 para indicar que no se encontró ningún objeto.
    let index = -1;
    for (let i = 0; i < store.listaActivos.length; i++) {
        if (store.listaActivos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};

let idCounter = 0;
const createId = () => {
    idCounter++;
    return idCounter.toString();
}

const confirmarEliminarSelec = () => {
    eliminarActivosDialog.value = true;
};
const eliminarActivosSelec = () => {
    store.listaActivos = store.listaActivos.filter(val => !activosSeleccionados.value.includes(val));
    eliminarActivosDialog.value = false;
    activosSeleccionados.value = null;
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activos Eliminados', life: 4000 });
};


const enviar = () => {
    store.enviar()
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha generado el Acta', life: 4000 });
};


</script>

<style scoped>

.contenedorEquipamiento {
    width: 1000px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    margin-left: 170px;
    margin-top: -20px;
}

.formgrid {
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.contenedorGeneral input {
    width: 200px;
}

.contenedorDialog {
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

.ContOfiSeguridad {
    background-color: rgb(245, 245, 245);
    width: 220px;
    border-radius: 20px;
    padding: 5px;
}

.checkbox-row {
    display: flex;
    flex-wrap: wrap;
}

.checkbox-col {
    display: flex;
    align-items: center;
    max-width: 200px;
}

.checkbox-label {
    min-width: 130px;

}

</style>



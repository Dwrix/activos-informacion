<template>
    <div class="contenedor">
        <h1>Form Entrega de Activos</h1>
        <p>El departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia
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
            <Calendar v-model="date" showIcon disabled /><br><br>

        </div>
    </div>
    <!-- ------------------------------------- -->
    <!-- ------------------------------------- -->
    <!-- ------------------------------------- -->
    <div class="contenedorEquipamiento">
        <div class="card">
            <h4>Agregar Equipamiento</h4>
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Agregar" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedProducts || !selectedProducts.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
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
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '600px' }" header="Agregar Equipamiento" :modal="true"
            class="p-fluid">
            <h4>Tipo Equipamiento </h4>
            <div class="formgrid grid">
                <div class="grid-column">
                    <label>Equipamiento Computacional</label>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo1" name="tipo" value="Computador Escritorio" v-model="product.tipo" />
                        <label for="tipo1"> Computador Escritorio</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo2" name="tipo" value="Computador Portatil" v-model="product.tipo" />
                        <label for="tipo2"> Computador Portatil</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo3" name="tipo" value="Impresora" v-model="product.tipo" />
                        <label for="tipo3"> Impresora</label>
                    </div>
                </div>
                <div class="grid-column">
                    <label>Periféricos</label>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo4" name="tipo" value="Escaner" v-model="product.tipo" />
                        <label for="tipo4"> Escaner</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo5" name="tipo" value="Monitor" v-model="product.tipo" />
                        <label for="tipo5"> Monitor</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo6" name="tipo" value="Proyector" v-model="product.tipo" />
                        <label for="tipo6"> Proyector</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton id="tipo7" name="tipo" value="Otro" v-model="product.tipo" />
                        <label for="tipo7"> Otro</label>
                    </div>
                </div>
            </div><br>

            <div class="contenedorPadre">
                <div class="contenedorGeneral">
                    <div class="field">
                        <label for="marca">Marca</label>
                        <InputText id="marca" v-model.trim="product.marca" required="true"
                            :class="{ 'p-invalid': submitted && !product.marca }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !product.marca">marca es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="modelo">Modelo</label>
                        <InputText id="modelo" v-model.trim="product.modelo" required="true"
                            :class="{ 'p-invalid': submitted && !product.modelo }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !product.modelo">modelo es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="serie">Serie</label>
                        <InputText id="serie" v-model.trim="product.serie" required="true"
                            :class="{ 'p-invalid': submitted && !product.serie }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !product.modelo">serie es obligatorio.</small>
                    </div>

                    <div class="field">
                        <label for="numInv">Número Inventario</label>
                        <InputText id="numInv" v-model.trim="product.numInv"
                            :class="{ 'p-invalid': submitted && !product.numInv }" style="display: block;" />
                    </div><br>

                </div>
                <div class="ContenedorPcs"
                    v-if="product.tipo === 'Computador Escritorio' || product.tipo === 'Computador Portatil'">

                    <div class="field">
                        <label for="procesador">Procesador</label>
                        <InputText id="procesador" v-model.trim="product.procesador"
                            :class="{ 'p-invalid': submitted && !product.procesador }" />
                    </div>

                    <div class="field">
                        <label for="ram">Memoria RAM</label>
                        <InputText id="ram" v-model.trim="product.ram"
                            :class="{ 'p-invalid': submitted && !product.ram }" />
                    </div>

                    <div class="field">
                        <label for="discoDuro">Disco Duro</label>
                        <InputText id="discoDuro" v-model.trim="product.discoDuro"
                            :class="{ 'p-invalid': submitted && !product.discoDuro }" />
                    </div>

                    <div class="field">
                        <label for="tarjetavideo">Tarjeta de Video</label>
                        <InputText id="tarjetavideo" v-model.trim="product.tarjetavideo"
                            :class="{ 'p-invalid': submitted && !product.tarjetavideo }" />
                    </div>

                    <div class="formgrid grid">
                        <div class="field-radiobutton col-6">
                            <label> Lector/Grabador de DVD </label><br>
                            <RadioButton id="dvdSi" name="dvd" value="Si" v-model="product.dvd" />
                            <label for="dvdSi"> Si </label>
                            <RadioButton id="dvdNo" name="dvd" value="No" v-model="product.dvd" />
                            <label for="dvdNo"> No </label>

                        </div><br>
                        <div class="field-radiobutton col-6">
                            <label> Teclado y Mouse</label>
                            <RadioButton id="tecladoMousesi" name="tecladoMouse" value="Si"
                                v-model="product.tecladoMouse" />
                            <label for="tecladoMousesi"> Si </label>
                            <RadioButton id="tecladoMouseNo" name="tecladoMouse" value="No"
                                v-model="product.tecladoMouse" />
                            <label for="tecladoMouseNo"> No </label>

                        </div>

                    </div>

                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Agregar" icon="pi pi-check" text @click="guardarActivo" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product"> Estas seguro que quieres eliminar <b>{{ product.tipo }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Si" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product"> Estas seguro que quieres eliminar los activos seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Si" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog><br>

        <div class="card flex justify-content-center">
            <Button label="Enviar" icon="pi pi-check" iconPos="right"  @click="enviar"/>
        </div>
    </div>
    <Toast />

</template>

<script setup >
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';


const nombre = ref(null);
const rut = ref(null);
const cargo = ref(null);
const date = ref(new Date());
window.addEventListener('load', () => {
    date.value = new Date();
});

const selectedDir = ref();
const direccion = ref([
    { name: 'Departamento de Finanzas', code: 'DF' },
    { name: 'Servicios Generales', code: 'SV' },
    { name: 'Dirección de Gestion Ciudadana', code: 'DGC' },

]);
/* ----------------------------------- */


const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const selectedProduct = ref(null);
const toast = useToast();
const submitted = ref(false);

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});



const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const guardarActivo = () => {
    submitted.value = true;

    if (product.value.tipo.trim()) {
        if (product.value.id) {
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Modificado', life: 4000 });
            console.log('entro al if')
        }
        else {
            product.value.id = createId();
            /* product.value.code = createId(); */
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Agregado', life: 4000 });
            console.log('no entro al if')
        }

        productDialog.value = false;
        product.value = {}; 
    }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    selectedProduct.value = prod;
    productDialog.value = true;

};

const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activo Eliminado', life: 4000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
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

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Activos Eliminados', life: 4000 });
};


const enviar = () => {
    /* console.log('enviar') */
    console.log(products)
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


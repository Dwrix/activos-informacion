<template>
    <div class="contenedorEquipamiento">
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Agregar" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <!-- <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
                </template> -->
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <!-- <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Manage Products</h4>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template> -->

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="Code" sortable style="min-width:5rem"></Column>
                <Column field="tipo" header="Tipo" sortable style="min-width:5rem"></Column>
                <Column field="marca" header="Marca" sortable style="min-width:5rem"></Column>
                <Column field="modelo" header="Modelo" sortable style="min-width:5rem"></Column>
                <Column field="serie" header="Serie" sortable style="min-width:5rem"></Column>
                <Column field="numInv" header="Num Inventario" sortable style="min-width:10rem"></Column>
                <!--  <Column field="dvd" header="dvd" sortable style="min-width:10rem"></Column>
                <Column field="tecladoMouse" header="tecladoMouse" sortable style="min-width:10rem"></Column> -->
                <!-- <Column header="Image">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-2 border-round" style="width: 64px" />
                    </template>
                </Column> -->
                <!-- <Column field="price" header="Price" sortable style="min-width:8rem">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.price)}}
                    </template>
                </Column> -->

                <!-- <Column field="rating" header="Reviews" sortable style="min-width:12rem">
                    <template #body="slotProps">
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column> -->
                <!-- <Column field="inventoryStatus" header="Status" sortable style="min-width:12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column> -->
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
            <!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-3" /> -->
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
                        <small class="p-error" v-if="submitted && !product.marca">marca is required.</small>
                    </div>

                    <div class="field">
                        <label for="modelo">Modelo</label>
                        <InputText id="modelo" v-model.trim="product.modelo" required="true"
                            :class="{ 'p-invalid': submitted && !product.modelo }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !product.modelo">modelo is required.</small>
                    </div>

                    <div class="field">
                        <label for="serie">Serie</label>
                        <InputText id="serie" v-model.trim="product.serie" required="true"
                            :class="{ 'p-invalid': submitted && !product.serie }" style="display: block;" />
                        <small class="p-error" v-if="submitted && !product.modelo">serie is required.</small>
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
            <!-- <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !product.name }" />
                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
            </div>

            <div class="field">
                <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label"
                    placeholder="Select a Status">
                    <template #value="slotProps">
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value" :severity="getStatusLabel(slotProps.value.label)" />
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                </Dropdown>
            </div> -->



            <!-- <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                </div>
                <div class="field col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="product.quantity" integeronly />
                </div>
            </div> -->
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Agregar" icon="pi pi-check" text @click="saveProduct" />
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
            <Button label="Enviar" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';




const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({ tipo: 'default' });
const selectedProducts = ref();
const selectedProduct = ref(null);

/* const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
}); */
const submitted = ref(false);
/* const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]); */
/* const updateDialogWidth = (tipo) => {
    if (tipo === 'Computador Portatil' || tipo === 'Computador Escritorio') {
      dialogWidth.value = '1200px';
    } else {
      dialogWidth.value = '450px';
    }
}; */



onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});
/* watch(() => product.tipo, (tipo) => {
  if (tipo) {
    updateDialogWidth(tipo);
  }
}); */

/* const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
}; */

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (product.value.marca.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            /* product.value.image = 'product-placeholder.svg'; */
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
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
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
/* const exportCSV = () => {
    dt.value.exportCSV();
}; */
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

/* const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}; */

</script>  


<style scoped>
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


</style>




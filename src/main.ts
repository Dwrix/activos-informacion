import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';


import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

/* -- */

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';

import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import RadioButton from 'primevue/radiobutton';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';

/* -- */


//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

/* -- */
app.use(ToastService);
/* -- */

/* -- */
app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('DataTable', DataTable);
app.component('RadioButton', RadioButton);
app.component('InputNumber', InputNumber);
/* -- */


app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('Button', Button);
app.component('Textarea', Textarea);

app.mount('#app')

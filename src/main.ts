import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';


import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import  Textarea  from 'primevue/textarea';

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
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('Button', Button);
app.component('Textarea', Textarea);

app.mount('#app')

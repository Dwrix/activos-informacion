<template>
  <div class="contenedorNav">
    <Menu :model="items"></Menu>
  </div>
  
  <RouterView />
</template>

<script setup>

import { RouterView, } from 'vue-router'
import Menu from 'primevue/menu';
import { ref } from 'vue';


const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  /* { label: 'Ver Solicitudes', icon: 'pi pi-file', to: '/VerSolicitudes' }, */
  { label: 'Entrega', icon: 'pi pi-file', to: '/Entrega' },
  { label: 'Devolución', icon: 'pi pi-file', to: '/Devolucion' },
  { label: 'Orden de Salida', icon: 'pi pi-file', to: '/OrdenSalida' },
  { label: 'Ver Actas', icon: 'pi pi-file', to: '/VerActas' }
]);

</script>


<style scoped>

.contenedorNav {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  margin-top: 20px;
  border-radius: 20px;
  z-index: 999;
  background-color: #f2f2f2;
  
  
}



/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav a:hover {
  background-color: #e0e0e0;
}

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>


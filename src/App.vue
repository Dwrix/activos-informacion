<template>
  <div>
    <header class="encabezado">
      <h2>Gestión de Actas Activos de Información</h2>

    </header>

    <div class="contenedorNav">
      <Menu :model="items" :class="{ 'active-menu-item': items === selectedItem }"></Menu>
    </div>


    <RouterView />
  </div>
</template>

<script setup>

import { RouterView } from 'vue-router'
import Menu from 'primevue/menu';
import { ref } from 'vue';

const selectedItem = ref(null);
const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  /* { label: 'Ver Solicitudes', icon: 'pi pi-file', to: '/VerSolicitudes' }, */
  { label: 'Entrega', icon: 'pi pi-file', to: '/Entrega' },
  { label: 'Devolución', icon: 'pi pi-file', to: '/Devolucion' },
  { label: 'Préstamo', icon: 'pi pi-file', to: '/Prestamo' },
  { label: 'Orden de Salida', icon: 'pi pi-file', to: '/OrdenSalida' },
  { label: 'Ver Actas', icon: 'pi pi-copy', to: '/VerActas' }
]);



</script>


<style scoped>
.contenedorNav {
  position: fixed;
  top: 60px;
  /* Ajusta el valor en función de la altura del encabezado */
  left: 0;
  width: 200px;
  margin-top: 20px;
  border-radius: 20px;
  z-index: 999;

}

.encabezado {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #374d96;

  display: flex;
  align-items: center;
  justify-content: left;
  z-index: 999;

}

h2 {
  margin-left: 20px;
  color: white;
}

.active-menu-item {
  background-color: black;
  color: white;
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


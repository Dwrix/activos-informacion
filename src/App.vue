
<template>
  <!-- <header>
  
    </header> -->
    
  <div class="contenedorNav">
    <nav>
      <RouterLink to="/Home" exact activeClass="active" class="pi pi-home"> Home</RouterLink>
      <RouterLink to="/Entrega" exact activeClass="active" class="pi pi-file"> Entrega</RouterLink>
      <RouterLink to="/Devolucion" exact activeClass="active" class="pi pi-file"> Devolución</RouterLink>
      <RouterLink to="/OrdenSalida" exact activeClass="active" class="pi pi-file"> Orden de Salida</RouterLink>
      <RouterLink to="/VerActas" exact activeClass="active" class="pi pi-file"> Ver Actas</RouterLink>
    </nav>
  </div>  
  
  <RouterView />

</template>

<script setup lang="ts">

import { RouterLink, RouterView, } from 'vue-router'

</script>


<style scoped>

.contenedorNav {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  margin-top: 20px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 999;
  background-color: #f2f2f2;
  
}

/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

nav a {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.25rem
}

nav a.active {
  background-color: #59585abe;
  color: #fff;
}
nav a:first-of-type {
  border: 0;
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


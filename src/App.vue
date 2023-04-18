
<template>
  <!-- <header>
  
    </header> -->

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/Entrega">Entrega</RouterLink>
    <RouterLink to="/Devolucion">Devolucion</RouterLink>
    <RouterLink to="/OrdenSalida">Orden de Salida</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
/* import HelloWorld from './components/HelloWorld.vue' */


</script>



<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  background-color: #f2f2f2;
  padding: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.25rem
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
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
}
</style>
<!-- 
width: 200px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start; /* Alinea los elementos en la parte superior */
background-color: #f2f2f2;
padding: 1rem; -->

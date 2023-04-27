<template>
    <div class="contenedorNav">
        <nav>
            <RouterLink to="/Home" exact activeClass="active" class="pi pi-home"> Home</RouterLink>
            <RouterLink to="/VerSolicitudes" exact activeClass="active" class="pi pi-file"> Ver Solicitudes</RouterLink>
            <RouterLink to="/Entrega" exact activeClass="active" class="pi pi-file"> Entrega</RouterLink>
            <RouterLink to="/Devolucion" exact activeClass="active" class="pi pi-file"> Devolución</RouterLink>
            <RouterLink to="/OrdenSalida" exact activeClass="active" class="pi pi-file"> Orden de Salida</RouterLink>
            <RouterLink to="/VerActas" exact activeClass="active" class="pi pi-file"> Ver Actas</RouterLink>
        </nav>
    </div>
</template>
<script setut lang="ts">

</script>

<style>
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
</style>

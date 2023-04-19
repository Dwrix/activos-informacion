<template>
    <div class="contenedorLogin">
        <div class="card">
            <div class="flex flex-column md:flex-row">
                <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div class="flex align-items-center gap-2">
                        <label>Usuario</label>
                        <InputText id="username" type="text" class="w-full" />
                    </div>
                    <div class="flex align-items-center gap-2">
                        <label>Contraseña</label>
                        <InputText id="password" type="password" class="w-full" />
                    </div>
                    <Button label="Login" icon="pi pi-user" class="w-10rem"></Button>
                </div>
                <!-- <div class="w-full md:w-2">
                    <Divider layout="vertical" class="hidden md:flex"><b>OR</b></Divider>
                    <Divider layout="horizontal" class="flex md:hidden" align="center"><b>OR</b></Divider>
                </div>
                <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-10rem"></Button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.contenedorLogin{

    width: 450px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    margin-left: 180px;
    margin-top: -20px;
}

</style>
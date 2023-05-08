import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'

export const useEquipStore = defineStore('Equipamiento', () => {

  function enviar() {
    console.log(datosFormulario.value)
    console.log(listaActivos.value)

  }

  const date = ref(new Date());
  window.addEventListener('load', () => {
    date.value = new Date();
  });

  const datosFormulario = ref({
    nombre: '',
    rut: '',
    direccionSelec: '',
    cargo: '',
    /* fecha: new Date() */ //toma la fecha y hora
    fecha: format(date.value, 'dd/MM/yyyy')
  })

  const activo = ref({
    tipo: '',
    marca: '',
    modelo: '',
    serie: '',
    numInv: '',
    procesador: '',
    ram: '',
    discoDuro: '',
    tarjetavideo: '',
    dvd: '',
    tecladoMouse: '',
    tipoOtro: '',
  });

  const listaActivos = ref([])
  return { datosFormulario, activo, listaActivos, enviar }

})



/* export const useFormData = defineStore('FormData', () => {

  const datosFormulario = ref({
    nombre: '',
    rut: '',
    direccion: '',
    cargo: '',
    fecha: ''

  });
  return { datosFormulario }
  
}) */


/* export const useEquipStore = defineStore('Equipamiento', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
}) */


/* const formDataStore = pinia.store({
  id: 'formData',
  state: () => ({
    datosFormulario: {
      nombre: '',
      rut: '',
      direccion: '',
      cargo: '',
      fecha: ''
    },
    listaActivos: []
  })
})

export { pinia, formDataStore } */
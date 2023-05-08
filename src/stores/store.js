import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEquipStore = defineStore('Equipamiento', () => {

  function enviar() {
    console.log(datosFormulario)
    console.log(listaActivos)
  }
  const datosFormulario = ref({
    nombre: '',
    rut: '',
    direccion: '',
    cargo: '',
    fecha: ''
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
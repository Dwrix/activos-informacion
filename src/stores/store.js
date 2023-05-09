import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'

export const useEquipStore = defineStore('Equipamiento', () => {

  /* const idCounter = ref(0);

  function getNextId() {
    idCounter.value++;
    return idCounter.value;
  } */

  function enviar() {
    console.log(acta.value)
    console.log(listaActivos.value)

  }

  const date = ref(new Date());
  window.addEventListener('load', () => {
    date.value = new Date();
  });

  const acta = ref({
    /* id: getNextId(), */
    tipo: '',
    nombre: '',
    rut: '',
    direccionSelec: '',
    cargo: '',
    encargado:'',
    motivoSalida:'',
    /* fecha: new Date() */ //toma la fecha y hora
    fecha: format(date.value, 'dd/MM/yyyy')
  })

  /* const tipoSeleccionado = ref('') */

  const activo = ref({
    tipo: '',
    marca: '',
    modelo: '',
    serie: '',
    numInv: '',
    nombreEquipo: '',
    procesador: '',
    ram: '',
    discoDuro: '',
    tarjetavideo: '',
    dvd: '',
    tecladoMouse: '',
    tipoOtro: '', 
  });

  const listaActivos = ref([])

 


  return { /* tipoSeleccionado, */ acta, activo, listaActivos, enviar }

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
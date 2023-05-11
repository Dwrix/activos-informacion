import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'

export const useEquipStore = defineStore('Equipamiento', () => {

  /* const idCounter = ref(0);

  function getNextId() {
    idCounter.value++;
    return idCounter.value;
  } */

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
    encargado: '',
    motivoSalida: '',
    /* fecha: new Date() */ //toma la fecha y hora
    fecha: format(date.value, 'dd/MM/yyyy'),
    observaciones: '',
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

  function limpiarCampos() {
    acta.value = {
      tipo: '',
      nombre: '',
      rut: '',
      direccionSelec: '',
      cargo: '',
      encargado: '',
      motivoSalida: '',
      fecha: format(date.value, 'dd/MM/yyyy'),
      observaciones: '',
    };
    activo.value = {
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
    };
  }

  function enviar() {
    console.log(acta.value)
    console.log(listaActivos.value)
    limpiarCampos();

  }

  return { /* tipoSeleccionado, */ acta, activo, listaActivos, enviar }

})

//counter
/* import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
}) */
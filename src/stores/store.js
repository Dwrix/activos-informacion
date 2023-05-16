import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { collection, addDoc } from 'firebase/firestore';
import db from '../firestore';




export const useActaStore = defineStore('Acta', () => {

  

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

  }

  function enviar() {
    /* console.log(acta.value)
    console.log(listaActivos.value) */
    
     // Crea un nuevo documento en la colección "actaCollection" con los datos del formulario
     addDoc(collection(db, 'actaCollection'), {
      nombre: acta.value.nombre,
      rut: acta.value.rut,
      tipo: acta.value.tipo,
      // ... otros campos del acta.value
    })
      .then((docRef) => {
        console.log('Documento guardado con ID:', docRef.id);
        limpiarCampos();
        // Realizar acciones adicionales después de guardar los datos
      })
      .catch((error) => {
        console.error('Error al guardar el documento:', error);
        // Manejo de errores
      });
    

    
 

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



/* db.collection("actaCollection").add({
  tipo: acta.value.tipo,
  nombre: acta.value.nombre,
  rut: acta.value.rut,
  direccionSelec: acta.value.direccionSelec,
  cargo: acta.value.cargo,
  encargado: acta.value.encargado,
  motivoSalida: acta.value.motivoSalida,

fecha: format(date.value, 'dd/MM/yyyy'),
observaciones: acta.value.observaciones,
  // ...otros campos del acta...
})
.then((docRef) => {
  console.log("Documento guardado con ID:", docRef.id);
  
  // Realizar acciones adicionales después de guardar los datos
})
.catch((error) => {
  console.error("Error al guardar el documento:", error);
  // Manejo de errores
}); */
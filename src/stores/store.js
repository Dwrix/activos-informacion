import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { collection, addDoc, doc, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore'
import db from '../firestore'



export const useActaStore = defineStore('Acta', () => {

  const activoSeleccionado = ref({});

  function setActivoSeleccionado(activo) {
    activoSeleccionado.value = activo;
  }

  function getActivoSeleccionado() {
    return activoSeleccionado.value;
  }

  const date = ref(new Date())
  window.addEventListener('load', () => {
    date.value = new Date()
  })

  const acta = ref({
    tipo: '',
    nombre: '',
    rut: '',
    direccionSelec: '',
    cargo: '',
    encargado: '',
    motivoSalida: '',
    fecha: format(date.value, 'dd/MM/yyyy'),
    observaciones: '',
    activos: [] 
  })

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
  })

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
      activos: [] 
    }
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
    }
    listaActivos.value = []; 
  }


  async function enviar() {
    // Obtén la referencia al contador
    const counterRef = doc(db, 'counters', 'counterId')

    // Incrementa el contador en 1 y obtén el nuevo valor
    const newActaId = await updateDoc(counterRef, {
      actaId: increment(1),
    }).then(() => {
      return getDoc(counterRef).then((docSnapshot) => {
        return docSnapshot.data().actaId
      })
    })

    //  convertir el valor de `newActaId` a un número, para que firestore lo detecte como un numero 
    // y no alfanumerico y arreglar el problema de la lista
    const newActaIdNumber = Number(newActaId);

    // Crea el nuevo documento utilizando el ID incrementado
    const nuevoDocumentoRef = doc(collection(db, 'actaCollection'), String(newActaIdNumber))
    
    // Establece los datos del documento
    //await para garantizar que los doc se establezcan y se agegen correctamente antes de seguir
    await setDoc(nuevoDocumentoRef, {
      id: newActaId,
      tipo: acta.value.tipo,
      nombre: acta.value.nombre,
      rut: acta.value.rut,
      direccionSelec: acta.value.direccionSelec,
      cargo: acta.value.cargo,
      encargado: acta.value.encargado,
      motivoSalida: acta.value.motivoSalida,
      fecha: format(date.value, 'dd/MM/yyyy'),
      observaciones: acta.value.observaciones,
    })


    // Crea una colección "activos" dentro del documento del acta
    const activosCollectionRef = collection(nuevoDocumentoRef, 'activos');

    // Guarda la lista de activos en la subcolección "activos"
    await Promise.all(
      listaActivos.value.map(async (activo) => {
        await addDoc(activosCollectionRef, activo);
      })
    );

    /* console.log('se guardo el acta');
    console.log(listaActivos.value);
    console.log(acta.value); */
    
      
    limpiarCampos()
  }

  return { acta, activo, listaActivos, enviar, setActivoSeleccionado, getActivoSeleccionado }
})




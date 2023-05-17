import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { collection, addDoc, doc, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore'
import db from '../firestore'

export const useActaStore = defineStore('Acta', () => {
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
    }
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

    // Crea el nuevo documento utilizando el ID incrementado
    const nuevoDocumentoRef = doc(collection(db, 'actaCollection'), String(newActaId))

    // Establece los datos del documento
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

    await setDoc(nuevoDocumentoRef, datosActa);

    // Crea una colección "activos" dentro del documento del acta
    const activosCollectionRef = collection(nuevoDocumentoRef, 'activos');

    // Guarda la lista de activos en la subcolección "activos"
    await Promise.all(
      listaActivos.value.map(async (activo) => {
        await addDoc(activosCollectionRef, activo);
      })
    );

    
  }

  return { acta, activo, listaActivos, enviar }
})




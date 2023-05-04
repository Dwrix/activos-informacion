import { createStore } from 'pinia'

export const useStore = createStore({
  state: {
    inputs: {
      nombre: '',
      rut: '',
      direccionSelec: '',
      cargo: '',
      date: '',
      // Aquí agrega todos los campos de tus inputs en FormEntrega.vue
    },
    activos: []
  },
  actions: {
    addActivo(activo) {
      this.activos.push(activo)
    }
  }
})
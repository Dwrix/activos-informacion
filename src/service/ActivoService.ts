export const ActivoService = {
    getActivosData() {
        return [
            /* {
                id: '1',
                code:'GBX2',
                tipo:'Computador Escritorio',
                marca:'HP',
                modelo:'XB455B',
                serie:'SDA12H',
                numInv:'1',
                procesador:'',
                ram:'',
                discoDuro:'',
                procesador:'',
                procesador:'',

            },
            {
                id: '2',
                code:'DFX2',
                tipo:'Impresora',
                marca:'HP',
                modelo:'XB56B',
                serie:'Sh752H',
                numInv:'2'

            } */
        ];
    },

    getctivosWithOrdersData() {
        return [
        ];
    },

    getActivosMini() {
        return Promise.resolve(this.getActivosData().slice(0, 5));
    },

    getActivosSmall() {
        return Promise.resolve(this.getActivosData().slice(0, 10));
    },

    getActivos() {
        return Promise.resolve(this.getActivosData());
    },

   /*  getActivosWithOrdersSmall() {
        return Promise.resolve(this.getActivosWithOrdersData().slice(0, 10));
    },

    getActivosWithOrders() {
        return Promise.resolve(this.getActivosWithOrdersData());
    } */
};
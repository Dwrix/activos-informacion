export const ProductService = {
    getProductsData() {
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

    getProductsWithOrdersData() {
        return [
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};
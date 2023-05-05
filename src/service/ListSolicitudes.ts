/* export const ListSolicitudes = {
    getSolicitudesData() {
        return [
             {
                id: '1',
                nombre:'GBX2',
                tipo:'Computador Escritorio',
                fecha:'Computador Escritorio',
               

            },
            {
                id: '2',
                code:'DFX2',
                tipo:'Impresora',
                marca:'HP',
                modelo:'XB56B',
                serie:'Sh752H',
                numInv:'2'

            }  
        ];
    },
    

   
    
}; */
export const ListSolicitudes = {
getSolicitudesData() {
    return Promise.resolve([
      {
        id: '1',
        nombre:'Diego Perez',
        depto:'TIC',
        fecha:'05/02/2023',
      },
      {
        id: '2',
        nombre:'Maria Perez',
        depto:'TIC',
        fecha:'05/02/2023',
      },
      /* {
        id: '2',
        code:'DFX2',
        tipo:'Impresora',
        marca:'HP',
        modelo:'XB56B',
        serie:'Sh752H',
        numInv:'2'
      } */
    ]);
  },
}

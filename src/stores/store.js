import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { collection, addDoc, doc, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore'
import { uploadString } from 'firebase/storage';
import db from '../firestore'
import html2pdf from 'html2pdf.js';



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
    fechaEntregaPrestamo: '',
    fechaDevolucionPrestamo: '',
    nombreGestion: '',
    observaciones: '',
    activos: [],
    pdf: null,
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
    macOS: false,
    msOffice: false,
    msProyect: false,
    acrobatReader: false,
    sqlServer: false,
    photoshop: false,
    av: false,
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
      fechaEntregaPrestamo: '',
      fechaDevolucionPrestamo: '',
      nombreGestion: '',
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
    // Obtener la referencia al contador
    const counterRef = doc(db, 'counters', 'counterId')

    // Incrementa el contador en 1 y obtén el nuevo valor
    await updateDoc(counterRef, {
      actaId: increment(1),
    });

    // Obtiene el valor actual del contador
    const counterDoc = await getDoc(counterRef);
    const newActaId = counterDoc.data().actaId;

    // Genera el valor del ID con ceros a la izquierda para que se guarde la lista en orden
    const newActaIdWithPadding = newActaId.toString().padStart(3, '0');



    // Crea el nuevo documento utilizando el ID incrementado
    const nuevoDocumentoRef = doc(collection(db, 'actaCollection'), newActaIdWithPadding)


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
      //ternario para verificar que tiene un valor definido, si tiene valor formatea
      fechaEntregaPrestamo: acta.value.fechaEntregaPrestamo ? format(acta.value.fechaEntregaPrestamo, 'dd/MM/yyyy') : null,
      fechaDevolucionPrestamo: acta.value.fechaDevolucionPrestamo ? format(acta.value.fechaDevolucionPrestamo, 'dd/MM/yyyy') : null,
      nombreGestion: acta.value.nombreGestion,
      observaciones: acta.value.observaciones,
    })



    // Crea una colección "activos" dentro del documento del acta
    const activosCollectionRef = collection(nuevoDocumentoRef, 'activos');

    await Promise.all(
      listaActivos.value.map(async (activo) => {
        const activoConValoreVacios = {
          id: activo.id || '', // Si está vacío, asigna un valor vacío para que no salga undefined
          tipo: activo.tipo || '', // Si está vacío, asigna un valor vacío
          marca: activo.marca || '', // Si está vacío, asigna un valor vacío
          modelo: activo.modelo || '', // Si está vacío, asigna un valor vacío
          serie: activo.serie || '', // Si está vacío, asigna un valor vacío
          numInv: activo.numInv || '', // Si está vacío, asigna un valor vacío
          nombreEquipo: activo.nombreEquipo || '', // Si está vacío, asigna un valor vacío
          procesador: activo.procesador || '', // Si está vacío, asigna un valor vacío
          ram: activo.ram || '', // Si está vacío, asigna un valor vacío
          discoDuro: activo.discoDuro || '', // Si está vacío, asigna un valor vacío
          tarjetavideo: activo.tarjetavideo || '', // Si está vacío, asigna un valor vacío
          dvd: activo.dvd || '', // Si está vacío, asigna un valor vacío
          tecladoMouse: activo.tecladoMouse || '', // Si está vacío, asigna un valor vacío
          tipoOtro: activo.tipoOtro || '', // Si está vacío, asigna un valor vacío
          macOS: activo.macOS ? 'Si' : 'No',
          msOffice: activo.msOffice ? 'Si' : 'No',
          msProyect: activo.msProyect ? 'Si' : 'No',
          acrobatReader: activo.acrobatReader ? 'Si' : 'No',
          sqlServer: activo.sqlServer ? 'Si' : 'No',
          photoshop: activo.photoshop ? 'Si' : 'No',
          av: activo.av ? 'Si' : 'No',
        };

        await addDoc(activosCollectionRef, activoConValoreVacios);
      })
    );

    // Agrega el PDF asociado al acta si está definido
    if (acta.value.pdf) {
      const pdfCollectionRef = collection(nuevoDocumentoRef, 'pdfs');
      const pdfDocRef = doc(pdfCollectionRef, 'documentoPdf');

      await setDoc(pdfDocRef, {
        nombre: acta.value.pdf.nombre,
        ruta: `pdfs/${nuevoDocumentoRef.id}/${acta.value.pdf.nombre}`,
      });

      const pdfStorageRef = ref(storage, `pdfs/${nuevoDocumentoRef.id}/${acta.value.pdf.name}`);
      await uploadString(pdfStorageRef, acta.value.pdf, 'data_url');
    }

    if (acta.value.fechaEntregaPrestamo) {
      acta.fechaEntregaPrestamo = format(acta.value.fechaEntregaPrestamo, 'dd/MM/yyyy');
    }

    if (acta.value.fechaDevolucionPrestamo) {
      acta.fechaDevolucionPrestamo = format(acta.value.fechaDevolucionPrestamo, 'dd/MM/yyyy');
    }

    limpiarCampos()
  }

  async function exportarPDF(rowData) {
    try {
      const element = document.createElement('div');

      let contenidoAdicional = '';

      const logo = 'src/assets/logo.png'; // Ruta de la imagen del logo
      let titulo = ''; // Título del acta
      const fecha = rowData.fecha; // Fecha del acta
      const version = '1.0'; // Versión del acta





      /* let tipoActa = ''; */
      let parrafo1 = '';
      let parrafo2 = '';

      // Verifica el tipo de acta y establece el título correspondiente
      if (rowData.tipo === 'Entrega') {
        titulo = 'Acta de Entrega';
        parrafo1 = 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República, mediante el presente acto, hace entrega de equipamiento computacional a:';
      } else if (rowData.tipo === 'Devolución') {
        titulo = 'Acta de Devolución';
        parrafo1 = 'Mediante el presente acto, el usuario hace devolución del equipamiento computacional otorgado por el Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, los datos son los siguientes:';
        parrafo2 = '';
      } else if (rowData.tipo === 'Orden de Salida') {
        titulo = 'Acta de Orden de Salida';
        parrafo1 = 'La Jefatura del Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República, mediante el presente acto, autoriza la salida de equipamiento computacional a:';
      } else if (rowData.tipo === 'Prestamo') {
        titulo = 'Acta de Préstamo de Equipamiento Computacional';
        parrafo1 = 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de La República, mediante el presente acto, hace préstamo del equipamiento computacional a:';
      }

      const encabezadoTabla = `
        <table style="width: 80%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;">
          <tr>
            <td style="text-align: center; vertical-align: middle;">
              <img src="${logo}" style="width: 100px;">
            </td>
            <td style="text-align: center; font-size: 18px; font-weight: bold; padding-bottom: 10px;">
              ${titulo}
            </td>
            <td style="text-align: right; font-size: 12px;">
              Fecha: ${fecha}<br>
              Versión: ${version}
            </td>
          </tr>
        </table>
      `;
      const pieTabla = `
        <table style="width: 80%; margin-left: 80px; margin-right: 30px;">
          <tr>
            <td style="text-align: center; vertical-align: middle;">
              <p>ELABORADO POR: Área de Operaciones y Soporte, Encargado SSI. </p>
            </td>
            <td style="text-align: center; vertical-align: middle;">
              <p>APROBADO POR: Jefatura Depto. de Tecnologías de la Información y la Comunicación (TIC). </p>
            </td>   
          </tr>
        </table>
      `;

      const motivoSalida = rowData.tipo === 'Orden de Salida' ? `
        <tr>
          <td style='background-color: #dcdcdc; font-weight: bold;'> • Motivo Salida:</td>
          <td>${rowData.motivoSalida}</td>
        </tr>
      ` : '';

      const observaciones = rowData.observaciones ? `
        <tr>
          <td style='background-color: #dcdcdc; font-weight: bold;'> • Observaciones:</td>
          <td>${rowData.observaciones}</td>
        </tr>
      ` : '';
      const fechaEntregaPrestamo = rowData.tipo === 'Prestamo' ? `
        <tr>
          <td style='background-color: #dcdcdc; font-weight: bold;'> • Fecha del Préstamo:</td>
          <td>${rowData.fechaEntregaPrestamo}</td>
        </tr>
      ` : '';
      const fechaDevolucionPrestamo = rowData.tipo === 'Prestamo' ? `
        <tr>
          <td style='background-color: #dcdcdc; font-weight: bold;'> • Fecha de la devolución:</td>
          <td>${rowData.fechaDevolucionPrestamo}</td>
        </tr>
      ` : '';




      const computadorTable = filtrarComputadorEscritorioPortatil(rowData.activos);
      const otrosActivosTable = filtrarOtrosActivos(rowData.activos);

      if (computadorTable.length > 0) {
        const computadorTableHtml = `
        <table style="width: 80%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;">
            <caption>EQUIPAMIENTO COMPUTACIONAL</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th style="width: 50px">Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Serie</th>
                <th>Nro Inventario</th>
                <th>Procesador</th>
                <th>RAM</th>
                <th>Disco Duro</th>
                <th>Lector/Grab DVD</th>
                <th>Teclado y Mouse</th>
              </tr>
            </thead>
            <tbody>
              ${computadorTable
            .map(activo => `
                  <tr>
                    <td>${activo.id}</td>
                    <td>${activo.nombreEquipo}</td>
                    <td>${activo.tipo}</td>
                    <td>${activo.marca}</td>
                    <td>${activo.modelo}</td>
                    <td>${activo.serie}</td>
                    <td>${activo.numInv}</td>
                    <td>${activo.procesador}</td>
                    <td>${activo.ram}</td>
                    <td>${activo.discoDuro}</td>
                    <td>${activo.dvd}</td>
                    <td>${activo.tecladoMouse}</td>
                  </tr>
  
                `)
            .join('')}
            </tbody>
          </table>
  
          
        `;
        /*  */

        const softwareTableHtml = `
          <table style="width: 70%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 100px;">
            <caption>S.O.- OFIMÁTICA-SEGURIDAD</caption>
            <thead>
              <tr>
                <th>ID Activo</th>
                <th>MacOS</th>
                <th>Ms Office</th>
                <th>Ms Proyect</th>
                <th>Acrobat Reader</th>
                <th>SQL Server</th>
                <th>Photoshop</th>
                <th>Antivirus</th>
                
              </tr>
            </thead>
            <tbody>
              ${computadorTable
            .map(activo => `
                  <tr>
                    <td>${activo.id}</td>
                    <td>${activo.macOS}</td>
                    <td>${activo.msOffice}</td>
                    <td>${activo.msProyect}</td>
                    <td>${activo.acrobatReader}</td>
                    <td>${activo.sqlServer}</td>
                    <td>${activo.photoshop}</td>
                    <td>${activo.av}</td>
                    
                  </tr>
  
                `)
            .join('')}
            </tbody>
          </table>
          
        `;
        /*  */

        if (rowData.tipo === 'Entrega') {
          contenidoAdicional += computadorTableHtml;
          contenidoAdicional += softwareTableHtml;
        } else {
          contenidoAdicional += computadorTableHtml;
        }

      }

      if (otrosActivosTable.length > 0) {
        const otrosActivosTableHtml = `
        <table style="width: 50%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;">
            <caption>Periféricos</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Serie</th>
                <th>Nro Inventario</th>
              </tr>
            </thead>
            <tbody>
              ${otrosActivosTable
            .map(activo => `
                  <tr>
                    <td>${activo.id}</td>
                    <td>${activo.tipo}</td>
                    <td>${activo.marca}</td>
                    <td>${activo.modelo}</td>
                    <td>${activo.serie}</td>
                    <td>${activo.numInv}</td>
                  </tr>
                `)
            .join('')}
            </tbody>
          </table>
        `;
        contenidoAdicional += otrosActivosTableHtml;
      }

      element.innerHTML = `
        <style>
          body {
            color: #000000;
            font-size: 12px;
            margin: 0;
          }
          table {
            border-collapse: collapse;
            margin-top: 10px;
          }
          table caption {
            font-weight: bold;
          }
          th {
            font-weight: bold;
            text-align: left;
            background-color: #dcdcdc;
          }
          th,
          td {
            padding: 5px;
            border: 1px solid;
            text-align: left;  
          }
          .column {
            width: 20px;
          }
          p {
            margin-left: 80px; margin-right: 30px;"
          }
          .contenedorPieTabla {

          
            bottom: 0;
            z-index: 1;
            margin-top: 50px;
            background-color: white;
            padding: 10px;
            /* border-top: 1px solid #000000; */
            font-size: 12px;
          }
          
          .pieTabla {
            margin-top: 10px;
          }
          
         
        </style>
        ${encabezadoTabla}
        
        
        <br>
        <p>${parrafo1}</p>
        <br>
        <table style='width: 70%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;'>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;'> • ID del Acta:</td>
            <td>${rowData.id}</td>
          </tr>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;'> • Sr.(a):</td>
            <td>${rowData.nombre}</td>
          </tr>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;' > • Rut:</td>
            <td>${rowData.rut}</td>
          </tr>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;'> • Firma:</td>
            <td></td>
          </tr>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;'> • Dirección /Depto. /Unidad:</td>
            <td>${rowData.direccionSelec.nombre}</td>
          </tr>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;'> • Cargo:</td>
            <td>${rowData.cargo}</td>
          </tr>
          <tr>
            <td style='background-color: #dcdcdc; font-weight: bold;'> • Tipo:</td>
            <td>${rowData.tipo}</td>
          </tr>
         
          ${fechaEntregaPrestamo}
          ${fechaDevolucionPrestamo}
          ${motivoSalida}
          ${observaciones}
        </table>
        <br>
        ${contenidoAdicional}
        <div class="contenedorPieTabla">
          <div class="pieTabla">
            ${pieTabla}
          </div>
      </div>
        
      `;


      // Crea el PDF con el contenido
      await html2pdf().from(element).save(`Acta_${rowData.id}.pdf`);



    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  }


  function filtrarComputadorEscritorioPortatil(activos) {
    return activos.filter(activo => activo.tipo === 'Computador Escritorio' || activo.tipo === 'Computador Portatil');
  }

  function filtrarOtrosActivos(activos) {
    return activos.filter(activo => activo.tipo !== 'Computador Escritorio' && activo.tipo !== 'Computador Portatil');
  }

  return { acta, activo, listaActivos, enviar, setActivoSeleccionado, getActivoSeleccionado, exportarPDF }
})



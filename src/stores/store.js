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

  
//

  function limpiarCampos() {
    
    const tipoActaValue = acta.value.tipo;
    acta.value = {
      tipo: tipoActaValue,
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

    // Asignar nuevamente el valor de acta.tipo al estado reactivo
    tipoActa.value = acta.value.tipo; 
  }

  const direccionOpciones = ref([
    { nombre: 'Auditoría Interna', code: '1' },
    { nombre: 'Abastecimiento', code: '2' },
    { nombre: 'Planificación y Control de Gestión', code: '3' },
    { nombre: 'Tecnologías de la Información y la Comunicación (TIC)', code: '4' },
    { nombre: 'Finanzas', code: '5' },
    { nombre: 'Gestión de las Personas', code: '6' },
    { nombre: 'Jurídico', code: '7' },
    { nombre: 'Logística', code: '8' },
    { nombre: 'Patrimonio Cultural', code: '9' },
    { nombre: 'Repostero Presidencial y Casino General', code: '10' },
    { nombre: 'Dirección Administrativa', code: '11' },
    { nombre: 'Dirección de Gestión Ciudadana', code: '12' },
    { nombre: 'Dirección de Políticas Públicas', code: '13' },
    { nombre: 'Dirección de Prensa y Fotografía', code: '14' },
    { nombre: 'Dirección de Programación', code: '15' },
    { nombre: 'Dirección Socio Cultural', code: '16' },
    { nombre: 'Gabinete Presidencial', code: '17' },
    { nombre: 'Memoria Presidencial', code: '18' },
    { nombre: 'Residencia Presidencial Palacio Cerro Castillo', code: '19' },
    { nombre: 'Subdirección Administrativa', code: '20' },
    { nombre: 'Subvención Presidencial', code: '21' },
    { nombre: 'Seguridad Presidencial', code: '22' },
    { nombre: 'Gabinete Primera Dama', code: '23' },
    { nombre: 'Sistema Gestión de la Calidad', code: '24' },
    { nombre: 'Dirección de Estudios', code: '25' },

  ]);

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
          id: activo.id || '', // Si está vacío, asigna un valor vacío para que no imprima como undefined
          tipo: activo.tipo || '',
          marca: activo.marca || '',
          modelo: activo.modelo || '',
          serie: activo.serie || '',
          numInv: activo.numInv || '',
          nombreEquipo: activo.nombreEquipo || '',
          procesador: activo.procesador || '',
          ram: activo.ram || '',
          discoDuro: activo.discoDuro || '',
          tarjetavideo: activo.tarjetavideo || '',
          dvd: activo.dvd || '',
          tecladoMouse: activo.tecladoMouse || '',
          tipoOtro: activo.tipoOtro || '',
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

      const logo = './assets/logo.png';
      let titulo = '';
      const fecha = rowData.fecha;
      const version = '1.0';

      /* let tipoActa = ''; */
      let parrafo1 = '';

      const computadorTable = filtrarComputadorEscritorioPortatil(rowData.activos);
      const otrosActivosTable = filtrarOtrosActivos(rowData.activos);

      const tipoData = {
        Entrega: {
          titulo: computadorTable.length > 0 ? 'Acta de Entrega de Equipamiento Computacional' : 'Acta de Entrega de Periféricos',
          parrafo1: computadorTable.length > 0 ? 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, mediante el presente acto, hace entrega de equipamiento computacional a:' : 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, mediante el presente acto, hace entrega de periféricos a:',
        },
        Devolución: {
          titulo: computadorTable.length > 0 ? 'Acta de Devolución de Equipamiento Computacional' : 'Acta de Devolución de Periféricos',
          parrafo1: computadorTable.length > 0 ? 'Mediante el presente acto, el usuario hace devolución del equipamiento computacional otorgado por el Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, los datos son los siguientes:' : 'Mediante el presente acto, el usuario hace devolución de los periféricos otorgados por el Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, los datos son los siguientes:',
        },
        'Orden de Salida': {
          titulo: 'Acta de Orden de Salida',
          parrafo1: 'La Jefatura del Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, mediante el presente acto, autoriza la salida de equipamiento computacional a:',
        },
        Prestamo: {
          titulo: computadorTable.length > 0 ? 'Acta de Préstamo de Equipamiento Computacional' : 'Acta de Préstamo de Periféricos',
          parrafo1: computadorTable.length > 0 ? 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, mediante el presente acto, hace préstamo del equipamiento computacional a:' : 'El Departamento de Tecnologías de la Información y la Comunicación (TIC) de la Presidencia de la República, mediante el presente acto, hace préstamo de los periféricos a:',
        },
      };
      
      // Obtén los valores correspondientes según el tipo de rowData
      const rowDataValues = tipoData[rowData.tipo];
      
      // Asigna los valores a las variables correspondientes
      if (rowDataValues) {
        titulo = rowDataValues.titulo;
        parrafo1 = rowDataValues.parrafo1;
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
              Versión: ${version}<br>
              <span style='font-weight: bold;'>ID del Acta: ${rowData.id}</span>
            </td>
          </tr>
        </table>
      `;
      const pieTabla = `
        <table style="width: 80%; margin-left: 80px; margin-right: 30px;">
          <tr>
            <td style="text-align: center; vertical-align: middle;">
              <span>ELABORADO POR: Área de Operaciones y Soporte, Encargado SSI. </span>
            </td>
            <td style="text-align: center; vertical-align: middle;">
              <span>APROBADO POR: Jefatura Depto. de Tecnologías de la Información y la Comunicación (TIC). </span>
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

      /* const computadorTable = filtrarComputadorEscritorioPortatil(rowData.activos);
      const otrosActivosTable = filtrarOtrosActivos(rowData.activos); */

      //acta entrega computador
      if (computadorTable.length > 0 && rowData.tipo === 'Entrega') {

        const t1EntregaPc = 'INDICACIONES SOBRE EL USO DE CONTRASEÑAS';
        const p1EntregaPc = '1.&nbsp;&nbsp;	El usuario debe cambiar la contraseña provisoria del computador al momento de la entrega por el personal del Área de Operaciones y Soporte del Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const p2EntregaPc = '2.&nbsp;&nbsp;	Del mismo modo, se recomienda al usuario elegir contraseñas que no sean fáciles de recordar; que contengan letras, mayúsculas, dígitos, y caracteres de puntuación; no estén basados en cosas obvias o de fácil deducción a partir de datos relacionados con la persona, por ejemplo: nombres, números telefónicos, cédula de identidad, fecha de nacimiento; también se debe evitar uso de contraseñas antiguas ';
        const p3EntregaPc = '3.&nbsp;&nbsp;	El usuario debe mantener confidencialmente, no debe compartir ni divulgar las contraseñas asignadas a los sistemas informáticos, correos electrónicos y/o cuentas de dominios de la institución. ';
        const p4EntregaPc = '4.&nbsp;&nbsp;	El usuario debe cambiar la contraseña regularmente o cuando lo recomiende el Departamento de Tecnologías de la Información y la Comunicación (TIC). ';
        const t2EntregaPc = 'INDICACIONES SOBRE LA PROTECCIÓN DE INFORMACIÓN INSTITUCIONAL ';
        const p5EntregaPc = '5.&nbsp;&nbsp;	El usuario debe proteger el acceso a la información al momento de dejar desatendido su computador, para ello en el teclado debe presionar las teclas Windows “win + L”, con esta acción logrará bloquear la sesión.';
        const p6EntregaPc = '6.&nbsp;&nbsp;	El usuario debe guardar la información relacionada con su trabajo en la unidad de red asignada por el Depto. de Tecnologías de la Información y la Comunicación (TIC) (Nombre de usuario:(R)) o en las carpetas compartidas del departamento correspondiente.';
        const p7EntregaPc = '7.&nbsp;&nbsp;	El Depto. de Tecnologías de la Información y la Comunicación (TIC) no respaldará ni responderá por pérdida de información personal del usuario almacenada en los computadores de la institución.';
        const p8EntregaPc = '8.&nbsp;&nbsp;	Los usuarios no podrán instalar programas, aplicaciones o software sin Licencias y que no estén debidamente autorizados por Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const t3EntregaPc = 'INDICACIONES DE USO DE RECURSOS INFORMÁTICOS.';
        const p9EntregaPc = '9.&nbsp;&nbsp;	El usuario debe utilizar el correo electrónico institucional solamente para fines laborales y no para fines personales.';
        const p10EntregaPc = '10.&nbsp;&nbsp;	Además, se recomienda que el sistema webmail no se utilice desde computadores no seguros, como en cyber o cybercafé debido a potenciales copia de contraseñas que permita vulnerar su información laboral.';
        const p11EntregaPc = '11.&nbsp;&nbsp;	Se prohíbe consumo de alimentos, bebidas y tabaco en centros de procesamiento de información (DataCenter) o bodega de almacenamiento de material impreso o en las cercanías de dichos lugares.';
        const p12EntregaPc = '12.&nbsp;&nbsp; Se prohíbe al usuario trasladar equipamiento computacional dentro o fuera de su lugar de trabajo, esta actividad la debe solicitar a través del sistema Centro de Servicio o enviar un correo electrónico a la Jefatura del Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const p13EntregaPc = '13.&nbsp;&nbsp;	El usuario debe realizar las solicitudes de soporte técnico a través del Sistema de Centro de Servicio disponible en la Intranet Institucional.';
        const p14EntregaPc = '14.&nbsp;&nbsp;	El usuario debe reportar incidentes de seguridad al correo reporteincidente@presidencia.cl o al fono 226904592, puede consultar el documento “Procedimiento de gestión de incidentes de seguridad de información” el que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información. ';
        const p15EntregaPc = '15.&nbsp;&nbsp;	El usuario se compromete a leer y respetar la Política General de Seguridad de la Información y la documentación complementaria que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información.';
        const p16EntregaPc = '16.&nbsp;&nbsp;	El usuario se compromete a seguir oportunamente las indicaciones del “Instructivo Acceso y Devolución de Activos de Información” al momento del cese o cambio de sus funciones, según corresponda el caso, el documento está disponible en la intranet institucional sección Comité de Seguridad de la Información.';

        contenidoAdicional += `
            <div>
              <h4 style='font-weight: bold; margin-left: 80px'>${t1EntregaPc}</h4>
              <p>${p1EntregaPc}</p>
              <p>${p2EntregaPc}</p>
              <p>${p3EntregaPc}</p>
              <p>${p4EntregaPc}</p><br>
              <h4 style='font-weight: bold; margin-left: 80px'>${t2EntregaPc}</h4>
              <p>${p5EntregaPc}</p>
              <p>${p6EntregaPc}</p>
              <p>${p7EntregaPc}</p>
              <p>${p8EntregaPc}</p><br>
              <div class="page-break">
                ${encabezadoTabla}<br>
                <h4 style='font-weight: bold; margin-left: 80px'>${t3EntregaPc}</h4>
                <p>${p9EntregaPc}</p>
                <p>${p10EntregaPc}</p>
                <p>${p11EntregaPc}</p>
                <p>${p12EntregaPc}</p>
                <p>${p13EntregaPc}</p>
                <p>${p14EntregaPc}</p>
                <p>${p15EntregaPc}</p>
                <p>${p16EntregaPc}</p>
              </div>
          </div> 
        `;

      }

      //Acta entrega solo perifericos
      if (rowData.tipo === 'Entrega' && computadorTable.length === 0) {
        // Mostrar parágrafos adicionales solo si el acta es de tipo "Entrega" y no hay activos de "Computador escritorio" o "Computador portátil"
        const t1periferico = 'INDICACIONES DE USO DE RECURSOS INFORMÁTICOS.';
        const p1periferico = '1.&nbsp;&nbsp;  El usuario se compromete a seguir oportunamente las indicaciones del “Instructivo Acceso y Devolución de Activos de Información” al momento del cese o cambio de sus funciones, según corresponda el caso, el documento está disponible en la intranet institucional sección Comité de Seguridad de la Información.';
        const p2periferico = '2.&nbsp;&nbsp;  Se prohíbe al usuario trasladar equipamiento computacional dentro o fuera de su lugar de trabajo, ésta actividad la debe solicitar a través del sistema Centro de Servicio o enviar un correo electrónico a la Jefatura del Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const p3periferico = '3.&nbsp;&nbsp;  El usuario debe reportar incidentes de seguridad al correo reporteincidente@presidencia.cl o al fono 226904592, puede consultar el documento “Procedimiento de gestión de incidentes de seguridad de información” el que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información. ';
        const p4periferico = '4.&nbsp;&nbsp;  El usuario debe realizar las solicitudes de soporte técnico a través del Sistema de Centro de Servicio disponible en la Intranet Institucional. ';

        contenidoAdicional += `
            <div>
              <h4 style='font-weight: bold; margin-left: 80px'>${t1periferico}</h4>
              <p>${p1periferico}</p>
              <p>${p2periferico}</p>
              <p>${p3periferico}</p>
              <p>${p4periferico}</p>
            </div>
        
        `;
      }

      //acta devolucion computador
      if (rowData.tipo === 'Devolución' && computadorTable.length > 0) {
        const t1DevoPc = 'Indicaciones de protección de Información Institucional';
        const p1DevoPc = '1.&nbsp;&nbsp;	El usuario debe guardar la información relacionada con su trabajo en la unidad de red asignada por el Depto. de Tecnologías de la Información y la Comunicación (TIC) (Nombre de usuario:(R)) o en las carpetas compartidas del departamento correspondiente.';
        const p2DevoPc = '2.&nbsp;&nbsp;	El Depto. de Tecnologías de la Información y la Comunicación (TIC) no respaldará ni responderá por pérdida de información personal del usuario almacenada en los computadores de la institución.';
        const t2DevoPc = 'Indicaciones de uso de Recursos Informáticos.';
        const p3DevoPc = '3.&nbsp;&nbsp;	El usuario se compromete a seguir oportunamente las indicaciones del “Instructivo Acceso y Devolución de Activos de Información” al momento del cese o cambio de sus funciones, según corresponda el caso, el documento está disponible en la intranet institucional sección Comité de Seguridad de la Información.';
        const p4DevoPc = '4.&nbsp;&nbsp;	Se prohíbe al usuario trasladar equipamiento computacional dentro o fuera de su lugar de trabajo, ésta actividad la debe solicitar a través del sistema Centro de Servicio o enviar un correo electrónico a la Jefatura del Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const p5DevoPc = '5.&nbsp;&nbsp;	El usuario debe reportar incidentes de seguridad al correo reporteincidente@presidencia.cl o al fono 226904592, puede consultar el documento “Procedimiento de gestión de incidentes de seguridad de información” el que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información.';

        contenidoAdicional += `
            <div>
              <h4 style='font-weight: bold; margin-left: 80px'>${t1DevoPc}</h4>
              <p>${p1DevoPc}</p>
              <p>${p2DevoPc}</p><br>
              <h4 style='font-weight: bold; margin-left: 80px'>${t2DevoPc}</h4>
              <p>${p3DevoPc}</p>
              <p>${p4DevoPc}</p>
              <p>${p5DevoPc}</p>
              <div class="page-break">
                ${encabezadoTabla}<br>
              </div
            </div>
        
        `;
      }

      //acta devolucion periferico
      if (rowData.tipo === 'Devolución' && computadorTable.length === 0) {
        const t1DevoPeriferico = 'INDICACIONES DE USO DE RECURSOS INFORMÁTICOS.';
        const p1DevoPeriferico = '1.&nbsp;&nbsp;	El usuario se compromete a seguir oportunamente las indicaciones del “Instructivo Acceso y Devolución de Activos de Información” al momento del cese o cambio de sus funciones, según corresponda el caso, el documento está disponible en la intranet institucional sección Comité de Seguridad de la Información.';
        const p2DevoPeriferico = '2.&nbsp;&nbsp;	Se prohíbe al usuario trasladar equipamiento computacional dentro o fuera de su lugar de trabajo, ésta actividad la debe solicitar a través del sistema Centro de Servicio o enviar un correo electrónico a la Jefatura del Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const p3DevoPeriferico = '3.&nbsp;&nbsp;	El usuario debe reportar incidentes de seguridad al correo reporteincidente@presidencia.cl o al fono 226904592, puede consultar el documento “Procedimiento de gestión de incidentes de seguridad de información” el que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información.';

        contenidoAdicional += `
            <div>
              <h4 style='font-weight: bold; margin-left: 80px'>${t1DevoPeriferico}</h4>
              <p>${p1DevoPeriferico}</p>
              <p>${p2DevoPeriferico}</p>
              <p>${p3DevoPeriferico}</p>     
            </div>
        
        `;
      }

      //prestamo equipamiento computacional
      if (rowData.tipo === 'Prestamo' && computadorTable.length > 0) {

        const t1PrestamoPc = 'INDICACIONES SOBRE LA PROTECCIÓN DE INFORMACIÓN INSTITUCIONAL ';
        const p1PrestamoPc = '1.&nbsp;&nbsp;	El usuario debe proteger el acceso a la información al momento de dejar desatendido su computador, para ello en el teclado debe presionar las teclas Windows “win + L”, con esta acción logrará bloquear la sesión.';
        const p2PrestamoPc = '2.&nbsp;&nbsp;	El Depto. de Tecnologías de la Información y la Comunicación (TIC) no respaldará ni responderá por pérdida de información personal del usuario almacenada en los computadores de la institución.';
        const p3PrestamoPc = '3.&nbsp;&nbsp;	Los usuarios no podrán instalar programas, aplicaciones o software sin Licencias y que no estén debidamente autorizados por Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const t2PrestamoPc = 'INDICACIONES DE USO DE RECURSOS INFORMÁTICOS.';
        const p4PrestamoPc = '4.&nbsp;&nbsp;	El usuario debe utilizar el correo electrónico institucional solamente para fines laborales y no para fines personales.';
        const p5PrestamoPc = '5.&nbsp;&nbsp; Además, se recomienda que el sistema webmail no se utilice desde computadores no seguros, como en cyber o cybercafé debido a potenciales copia de contraseñas que permita vulnerar su información laboral.';
        const p6PrestamoPc = '6.&nbsp;&nbsp;	Se prohíbe consumo de alimentos, bebidas y tabaco en centros de procesamiento de información (DataCenter) o bodega de almacenamiento de material impreso o en las cercanías de dichos lugares.';
        const p7PrestamoPc = '7.&nbsp;&nbsp; Se prohíbe al usuario trasladar equipamiento computacional dentro o fuera de su lugar de trabajo, ésta actividad la debe solicitar a través del sistema Centro de Servicio o enviar un correo electrónico a la Jefatura del Depto. de Tecnologías de la Información y la Comunicación (TIC).';
        const p8PrestamoPc = '8.&nbsp;&nbsp; El usuario debe realizar las solicitudes de soporte técnico a través del Sistema de Centro de Servicio disponible en la Intranet Institucional';
        const p9PrestamoPc = '9.&nbsp;&nbsp; El usuario debe reportar incidentes de seguridad al correo reporteincidente@presidencia.cl o al fono 226904592, puede consultar el documento “Procedimiento de gestión de incidentes de seguridad de información” el que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información. ';
        const p10PrestamoPc = '10.&nbsp;&nbsp; El usuario se compromete a leer y respetar la Política General de Seguridad de la Información y la documentación complementaria que se encuentra disponible en la intranet institucional, sección Comité de Seguridad de la Información.';
        const p11PrestamoPc = '11.&nbsp;&nbsp; El usuario se compromete a seguir oportunamente las indicaciones del “Instructivo Acceso y Devolución de Activos de Información” al momento del cese o cambio de sus funciones, según corresponda el caso, el documento está disponible en la intranet institucional sección Comité de Seguridad de la Información.';

        contenidoAdicional += `
        <div>
          <h4 style='font-weight: bold; margin-left: 80px'>${t1PrestamoPc}</h4>
          <p>${p1PrestamoPc}</p>
          <p>${p2PrestamoPc}</p>
          <p>${p3PrestamoPc}</p><br>
          <h4 style='font-weight: bold; margin-left: 80px'>${t2PrestamoPc}</h4> 
          <p>${p4PrestamoPc}</p>    
          <p>${p5PrestamoPc}</p>    
          <p>${p6PrestamoPc}</p> 
          
          <p>${p7PrestamoPc}</p>    
          <p>${p8PrestamoPc}</p>   
          <div class="page-break">
          ${encabezadoTabla}<br>    
          <p>${p9PrestamoPc}</p>    
          <p>${p10PrestamoPc}</p>    
          <p>${p11PrestamoPc}</p>
           
          </div>   
        </div>
    
    `;

      }

      //tabla computadores
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
            margin-left: 80px; 
            margin-right: 80px;
            text-align: justify;
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
          .page-break {
            page-break-before: always;
          }
        </style>

        ${encabezadoTabla}
        <br>
        <p>${parrafo1}</p>
        <br>
        <table style='width: 70%; border-collapse: collapse; margin-top: 10px; margin-left: 80px; margin-right: 30px;'>
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
            <td style='background-color: #dcdcdc; font-weight: bold; white-space: pre-wrap;'> • Encargado (Área de Operaciones y Soporte Depto. TIC):</td>
            <td>${rowData.encargado}</td>
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
      html2pdf().set({
        margin: [10, 10, 50, 10], // Márgenes superior, derecho, inferior e izquierdo
        image: { type: 'jpeg', quality: 0.98 }, // Opciones para la conversión de imágenes
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait', autoPaging: true }, // Agrega autoPaging: true
      }).from(element).save(`Acta_${rowData.id}.pdf`);

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

  return { acta, activo, listaActivos, enviar, setActivoSeleccionado, getActivoSeleccionado, exportarPDF, direccionOpciones }
})


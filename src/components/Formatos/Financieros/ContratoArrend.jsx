import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/contratoArrendamiento.png";


export default function ContratoArrend() {
  const arregloInputs = [
    { label: "Localidad en la que se firmará este contrato", type: "text", name: "Localidad", placeholder: "Ej. Madrid" },
    { label: "Nombre del Arrendador", type: "text", name: "arrendador", placeholder: "Nombre y Apellido" },
    { label: "Dirección del Arrendador", type: "text", name: "direccionArrendador", placeholder: "Ej: Calle Letanias 334" },
    { label: "Nombre del Arrendatario", type: "text", name: "arrendatario", placeholder: "Nombre y Apellido" },
    { label: "Dirección del Inmueble", type: "text", name: "direccionInmueble", placeholder: "Ej: Jr. Maria salinas 123" },
    { label: "Duración del Contrato", type: "text", name: "duracionContrato", placeholder: "Especificar meses o años" },
    { label: "Fecha de inicio del contrato", type: "date", name: "fechaInicio", placeholder: "dd/mm/yyyy" },
    { label: "Fecha de finalización del contrato", type: "date", name: "fechaFin", placeholder: "dd/mm/yyyy" },
    { label: "Monto de la Renta", type: "number", name: "montoRenta", placeholder: "Monto en Soles" },
    { label: "Método de pago", type: "text", name: "metodoPago", placeholder: "Ej: Transferencia bancaria" },
    { label: "Observaciones", type: "text", name: "observaciones", placeholder: "Opcional" }
  ];

  const [formData, formSetData] = useState({
    Localidad: "",
    arrendador: "",
    direccionArrendador: "",
    arrendatario: "",
    direccionInmueble: "",
    duracionContrato: "",
    fechaInicio: "",
    fechaFin: "",
    montoRenta: "",
    metodoPago: "",
    observaciones: ""
  });

  const [currentInput, setCurrentInput] = useState(0);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    formSetData({ ...formData, [name]: value });
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentInput > 0) {
      setCurrentInput(currentInput - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentInput < arregloInputs.length - 1) {
      setCurrentInput(currentInput + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    alert("Formulario enviado");
  };

  const handleWord = (e) => {
    e.preventDefault();

    try {
      const doc = new Doc({
        creator: "Mi Aplicación",
        title: "Contrato de Arrendamiento",
        subject: "Contrato de Arrendamiento de vivienda habitual",
        keywords: "Contrato, Arrendamiento, Vivienda",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Contrato de Arrendamiento de Vivienda Habitual",
                    bold: true,
                    size: 32,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `En la localidad de ${formData.Localidad || "_____"}, a fecha ${new Date().toLocaleDateString()}, se firma el presente contrato de arrendamiento entre las siguientes partes:`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Arrendador: ${formData.arrendador || "_____"}, con domicilio en ${formData.direccionArrendador || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Arrendatario: ${formData.arrendatario || "_____"}, quien ocupará el inmueble situado en ${formData.direccionInmueble || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Las partes acuerdan lo siguiente:", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `1. El presente contrato tiene una duración de ${formData.duracionContrato || "_____"}, comenzando el ${formData.fechaInicio || "_____/_____/_____"} y finalizando el ${formData.fechaFin || "_____/_____/_____"}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `2. El arrendatario se compromete a pagar una renta mensual de ${formData.montoRenta || "_____"} soles, que deberá ser abonada mediante ${formData.metodoPago || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "3. El arrendatario deberá mantener el inmueble en buen estado, realizando las reparaciones menores que sean necesarias durante la vigencia del contrato.",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "4. El arrendador se compromete a respetar la privacidad del arrendatario y no acceder al inmueble sin previo aviso.", size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "5. Cualquier modificación o acuerdo adicional deberá constar por escrito y estar firmado por ambas partes.", size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Observaciones: ${formData.observaciones || "Ninguna"}`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "En prueba de conformidad, firman ambas partes:",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({ text: "_________________________", size: 24 }),
              new Paragraph({ text: "Arrendador", size: 24 }),
              new Paragraph({ text: "" }),
              new Paragraph({ text: "_________________________", size: 24 }),
              new Paragraph({ text: "Arrendatario", size: 24 }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "ContratoArrendamiento.docx");
      });

      alert("Formulario enviado y Word generado");
    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };

  const ContractPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Contrato de Arrendamiento de Vivienda Habitual</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>En la localidad de <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.Localidad || "_____"}</Text>, a fecha {new Date().toLocaleDateString()}, se firma el presente contrato de arrendamiento entre las siguientes partes:</Text>
          <Text style={styles.text}><Text style={styles.bold}>Arrendador:</Text> <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.arrendador || "_____"}</Text>, con domicilio en <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.direccionArrendador || "_____"}</Text>.</Text>
          <Text style={styles.text}><Text style={styles.bold}>Arrendatario:</Text> <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.arrendatario || "_____"}</Text>, quien ocupará el inmueble situado en <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.direccionInmueble || "_____"}</Text>.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Las partes acuerdan lo siguiente:</Text>
          <Text style={styles.text}>1. El presente contrato tiene una duración de <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.duracionContrato || "_____"}</Text>, comenzando el <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.fechaInicio || "_____/_____/_____"}</Text> y finalizando el <Text style={{ backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.fechaFin || "_____/_____/_____"}</Text>.</Text>
          <Text style={styles.text}>2. El arrendatario se compromete a pagar una renta mensual de <Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.montoRenta || "_____"}</Text> soles, que deberá ser abonada mediante <Text style={{ backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.metodoPago || "_____"}</Text>.</Text>
          <Text style={styles.text}>3. El arrendatario deberá mantener el inmueble en buen estado, realizando las reparaciones menores que sean necesarias durante la vigencia del contrato.</Text>
          <Text style={styles.text}>4. El arrendador se compromete a respetar la privacidad del arrendatario y no acceder al inmueble sin previo aviso.</Text>
          <Text style={styles.text}>5. Cualquier modificación o acuerdo adicional deberá constar por escrito y estar firmado por ambas partes.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}><Text style={styles.bold}>Observaciones:</Text> <Text style={{ backgroundColor: currentInput === 10 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.observaciones || "Ninguna"}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>En prueba de conformidad, firman ambas partes:</Text>
          <Text style={styles.text}>{formData.arrendador || "_________________________"}</Text>
          <Text style={styles.text}>Arrendador</Text>
          <Text style={styles.text}>{formData.arrendatario || "_________________________"}</Text>
          <Text style={styles.text}>Arrendatario</Text>
        </View>
      </Page>
    </Document >
  );

  const styles = StyleSheet.create({
    page: {
      display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", padding: 40, fontSize: 12, lineHeight: 1.5
    },
    title: {
      textAlign: "center", fontSize: 18, fontWeight: 'bold', margin: 30
    },
    label: {
      padding: 5, fontSize: 10, fontWeight: 'bold', flexWrap: "wrap"
    },
    bordeTabla: {
      width: "100%",
      border: "1px solid gray"
    },
    filas: {
      display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid gray"
    },
    unicaCelda: { flex: 1, display: "flex", flexDirection: "row", padding: 1 },
    masDeUnaCelda: { flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-start", borderRight: "1px solid gray" },
    filaGruesa: {
      display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid gray", height: "15%"
    }


  });

  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 style={{ paddingBlock: "10px" }}>Contrato de Arrendamiento de Vivienda habitual</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)} tamano={arregloInputs.length} />
        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <label>{arregloInputs[currentInput].label}</label>
            <input
              type={arregloInputs[currentInput].type}
              name={arregloInputs[currentInput].name}
              placeholder={arregloInputs[currentInput].placeholder}
              value={formData[arregloInputs[currentInput].name]}
              onChange={handleChange}
              style={{ width: "auto", height: "2em", padding: "10px", backgroundColor: "white", color: "black", outline: "none", border: "1px solid gray", borderRadius: "5px" }}
              required
            />
            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 ? (<button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Atrás</button>) : null}
              {currentInput < arregloInputs.length - 1 ? (
                <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Paso siguiente <i className="ri-arrow-right-s-line"></i></button>
              ) : (
                <>
                  <PDFDownloadLink document={<ContractPDF />} fileName="Contrato_de_Arrendamiento.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." : <button type="button" style={{ backgroundColor: "tomato" }} onClick={setIsExportingPDF(true)}><i className="ri-save-fill"></i> PDF</button>)}
                  </PDFDownloadLink>
                  <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}><i className="ri-save-fill"></i> Word</button>
                </>
              )}
            </div>
          </form>
          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <ContractPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContratArrendComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/contrArrend/doc">
          <img src={contrato} alt="" />
        </Link>
        <div className="pasos">
          <h2>¿Como funciona?</h2>
          <div className="tarjeta_pasos">
            <i className="ri-file-text-line"></i>
            <div className="paso">
              <h3>1. Elegir este modelo</h3>
              <span>Empieza haciendo clic en "Rellenar el modelo"</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-pencil-fill"></i>
            <div className="paso">
              <h3>2. Rellenar el documento</h3>
              <span>Contesta a algunas preguntas y tu documento tipo se creará automáticamente.</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-printer-fill"></i>
            <div className="paso">
              <h3>3. Guardar - Imprimir</h3>
              <span>¡Tu documento está ya listo! Lo recibirás en los formatos Word y PDF. Lo podrás modificar.</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-user-2-fill"></i>
            <div className="paso">
              <h3>4. Consultar a un abogado</h3>
              <span>Puedes optar por recurrir a los servicios de un abogado después de haber rellenado el documento.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col2">
        <div className="titulo">
          <h1>Generador de Contrato de Arrendamiento de Vivienda Habitual</h1>
          <div className="details">
            <div className="card2">
              <h3>Formatos</h3>
              <span><i className="ri-file-text-line"></i> Word y PDF</span>
            </div>
            <div className="card3">
              <h3>Tamaño</h3>
              <span><i className="ri-expand-vertical-s-line"></i> 1 página</span>
            </div>
            <div className="card4">
              <span className='rank'>
                <div className="estrellas">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
                <span className='voto'>4,5 - 311 votos</span>
              </span>
            </div>
          </div>
          <Link to="/document/content/contrArrend/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es un Contrato de Arrendamiento de Vivienda Habitual?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Un <strong style={{ color: "#007bff" }}>Contrato de Arrendamiento de Vivienda Habitual</strong> es un acuerdo legal entre dos partes: el arrendador y el arrendatario. Mediante este contrato, el arrendador cede el uso y disfrute de una vivienda al arrendatario a cambio de una renta mensual, estableciendo condiciones claras sobre la duración, obligaciones y derechos de ambas partes.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Información clave del contrato:
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Localidad y Fecha:</strong> Lugar y fecha donde se firma el contrato, dejando constancia del acuerdo en un momento y lugar determinados.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Datos del Arrendador:</strong> Información sobre la persona propietaria del inmueble, incluyendo su nombre y domicilio.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Datos del Arrendatario:</strong> Información del inquilino que ocupará la vivienda, con detalles sobre la dirección del inmueble.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Duración del Contrato:</strong> Tiempo acordado para el arrendamiento, especificando fecha de inicio y finalización.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Renta Mensual:</strong> Importe que el arrendatario debe pagar al arrendador de forma periódica, así como el método de pago.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Mantenimiento del Inmueble:</strong> Responsabilidades del arrendatario para conservar la vivienda en buen estado, incluyendo reparaciones menores.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Privacidad:</strong> Compromiso del arrendador de respetar la privacidad del arrendatario y no acceder al inmueble sin aviso.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Modificaciones:</strong> Necesidad de acuerdos escritos y firmados para cualquier cambio en el contrato.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Observaciones:</strong> Espacio para incluir condiciones adicionales o aclaraciones relevantes.
              </li>
            </ul>

            <p style={{ fontSize: "16px", color: "#555" }}>
              Este contrato refleja los derechos y deberes tanto del arrendador como del arrendatario, garantizando un acuerdo transparente y legal para el uso de la vivienda.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px", paddingBlock: "1em" }}>
              ¿Por qué es importante realizar un Contrato de Arrendamiento de Vivienda Habitual?
            </h2>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Realizar un <strong style={{ color: "#007bff" }}>Contrato de Arrendamiento de Vivienda Habitual</strong> es fundamental por varias razones:
            </p>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Seguridad Jurídica:</strong> Establece un marco legal claro que protege los derechos y deberes tanto del arrendador como del arrendatario.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Evita Conflictos:</strong> Al dejar por escrito las condiciones del acuerdo, se minimizan posibles malentendidos o disputas.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Garantía de Pago:</strong> Estipula el monto de la renta y las condiciones de pago, lo que ofrece seguridad financiera al arrendador.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Protección del Inmueble:</strong> Define las responsabilidades del arrendatario respecto al mantenimiento y cuidado de la vivienda.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Duración del Arrendamiento:</strong> Establece el tiempo de permanencia del arrendatario, brindando estabilidad a ambas partes.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Respaldo Legal:</strong> En caso de incumplimientos, el contrato sirve como evidencia ante instancias legales.
              </li>
            </ul>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              En definitiva, este tipo de contrato ofrece una base sólida para una relación de arrendamiento justa y ordenada, asegurando que ambas partes cumplan con sus compromisos y disfruten de una convivencia armoniosa.
            </p>
          </div>
        </div>


      </div>
    </div>


  );
}
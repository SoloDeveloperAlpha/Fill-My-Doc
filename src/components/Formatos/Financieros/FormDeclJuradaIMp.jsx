import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/decljurImp.png";


export default function FormDeclJuradaIMp() {

  const arregloInputs = [
    { label: "Nombre Completo", type: "text", name: "nombreCompleto", placeholder: "Ej. Juan Pérez" },
    { label: "Número de Documento de Identidad", type: "text", name: "documentoIdentidad", placeholder: "Ej. 12345678" },
    { label: "Domicilio Fiscal", type: "text", name: "domicilioFiscal", placeholder: "Ej. Av. Principal 123" },
    { label: "Teléfono de Contacto", type: "tel", name: "telefono", placeholder: "Ej. 987654321" },
    { label: "Correo Electrónico", type: "email", name: "correo", placeholder: "Ej. correo@example.com" },
    { label: "Actividad Económica", type: "text", name: "actividadEconomica", placeholder: "Ej. Desarrollo de Software" },
    { label: "Ingresos Brutos Anuales (S/.)", type: "number", name: "ingresosBrutos", placeholder: "Ej. 50000" },
    { label: "Gastos Anuales Deducibles (S/.)", type: "number", name: "gastosDeducibles", placeholder: "Ej. 20000" },
    { label: "Impuesto a Pagar (S/.)", type: "number", name: "impuestoPagar", placeholder: "Ej. 3000" },
    { label: "Fuente de Ingresos", type: "text", name: "fuenteIngresos", placeholder: "Ej. Empleo, Negocio propio" },
    { label: "Observaciones", type: "text", name: "observaciones", placeholder: "Información adicional (opcional)" }
  ];

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    documentoIdentidad: "",
    domicilioFiscal: "",
    telefono: "",
    correo: "",
    actividadEconomica: "",
    ingresosBrutos: "",
    gastosDeducibles: "",
    impuestoPagar: "",
    fuenteIngresos: "",
    observaciones: ""
  });

  const [currentInput, setCurrentInput] = useState(0);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        title: "Declaración Jurada de Impuestos",
        subject: "Declaración Jurada de Impuestos",
        keywords: "Declaración, Jurada, Impuestos",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                spacing: 500,
                children: [
                  new TextRun({
                    text: "Declaración Jurada de Impuestos",
                    bold: true,
                    size: 32,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Yo, ${formData.nombreCompleto || "_____"}, identificado(a) con documento de identidad número ${formData.documentoIdentidad || "_____"}, domiciliado(a) en ${formData.domicilioFiscal || "_____"}, con número de teléfono ${formData.telefono || "_____"} y correo electrónico ${formData.correo || "_____"}, declaro bajo juramento lo siguiente:`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "1. Mi actividad económica principal es:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.actividadEconomica || "_____"}.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "2. Mis ingresos brutos anuales ascienden a:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.ingresosBrutos || "_____"} soles.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "3. Los gastos deducibles que declaro suman:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.gastosDeducibles || "_____"} soles.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "4. El impuesto a pagar calculado sobre mis ingresos es de:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.impuestoPagar || "_____"} soles.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "5. La principal fuente de mis ingresos proviene de:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.fuenteIngresos || "_____"}.`, size: 24 })
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Declaro que la información presentada es veraz y completa. Me comprometo a notificar cualquier cambio en mis ingresos o situación fiscal.",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Comprendo que cualquier falsedad en esta declaración puede derivar en sanciones legales según lo establecido en la normativa tributaria vigente.",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Realizada a fecha ${new Date().toLocaleDateString()}.`,
                    size: 24,
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
                    text: "______________________________",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.nombreCompleto || "Firma del Declarante",
                    size: 24,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "DeclaracionJuradaImpuestos.docx");
      });

      alert("Formulario enviado y Word generado");
    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };


  const DeclarationPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Declaración Jurada de Impuestos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Yo, <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombreCompleto || "_____"}</Text>, identificado(a) con documento de identidad número <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.documentoIdentidad || "_____"}</Text>, domiciliado(a) en <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.domicilioFiscal || "_____"}</Text>, con número de teléfono <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.telefono || "_____"}</Text> y correo electrónico <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.correo || "_____"}</Text>, declaro bajo juramento lo siguiente:
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>1. Mi actividad económica principal es <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.actividadEconomica || "_____"}</Text>.</Text>
          <Text style={styles.text}>2. Mis ingresos brutos anuales ascienden a <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.ingresosBrutos || "_____"}</Text> soles.</Text>
          <Text style={styles.text}>3. Los gastos deducibles que declaro suman <Text style={{ backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.gastosDeducibles || "_____"}</Text> soles.</Text>
          <Text style={styles.text}>4. El impuesto a pagar calculado sobre mis ingresos es de <Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.impuestoPagar || "_____"}</Text> soles.</Text>
          <Text style={styles.text}>5. La principal fuente de mis ingresos proviene de <Text style={{ backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.fuenteIngresos || "_____"}</Text>.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Declaro que la información presentada es veraz y completa. Me comprometo a notificar cualquier cambio en mis ingresos o situación fiscal.</Text>
          <Text style={styles.text}>Comprendo que cualquier falsedad en esta declaración puede derivar en sanciones legales según lo establecido en la normativa tributaria vigente.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Realizada a fecha {new Date().toLocaleDateString()}.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}><Text style={styles.bold}>Observaciones:</Text> <Text style={{ backgroundColor: currentInput === 10 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.observaciones || "Ninguna"}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>______________________________</Text>
          <Text style={styles.text}><Text style={{ borderBottom: "1px solid black" }}>{formData.nombreCompleto || "Firma del Declarante"}</Text></Text>
        </View>
      </Page>
    </Document >
  );


  const styles = StyleSheet.create({
    page: {
      display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", padding: 40, fontSize: 12, lineHeight: 1.5
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
        <h2 style={{ paddingBlock: "10px" }}>Formulario de Declaracion Jurada de Impuestos</h2>
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
              required
            />
            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 ? (<button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Atrás</button>) : null}
              {currentInput < arregloInputs.length - 1 ? (
                <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Paso siguiente <i className="ri-arrow-right-s-line"></i></button>
              ) : (
                <>
                  <PDFDownloadLink document={<DeclarationPDF />} fileName="Contrato_de_Arrendamiento.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." : <button type="button" style={{ backgroundColor: "tomato" }} onClick={setIsExportingPDF(true)}><i className="ri-save-fill"></i> PDF</button>)}
                  </PDFDownloadLink>
                  <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}><i className="ri-save-fill"></i> Word</button>
                </>
              )}
            </div>
          </form>
          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <DeclarationPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}



export function FormDeclarJuradImpComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/Fill-My-Doc/document/content/formDeclJurImp/doc">
          <img src={contrato} alt="" />
        </Link>
        <div className="pasos">
          <h2>¿Cómo funciona?</h2>
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
          <h1>Generador de Formulario de Declaración Jurada de Impuestos</h1>
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
          <Link to="/Fill-My-Doc/document/content/formDeclJurImp/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Declaración Jurada de Impuestos?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>Declaración Jurada de Impuestos</strong> es un documento en el cual una persona o empresa informa a la administración tributaria sobre sus ingresos, gastos y obligaciones fiscales en un período determinado. Esta declaración es utilizada por las autoridades para calcular y verificar el pago correcto de impuestos.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Por qué es importante realizar una Declaración Jurada de Impuestos?
            </h2>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Presentar una <strong style={{ color: "#007bff" }}>Declaración Jurada de Impuestos</strong> es crucial por varias razones:
            </p>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Obligación legal:</strong> Es un requisito establecido por la ley y su incumplimiento puede generar multas o sanciones.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Contribución al desarrollo:</strong> Permite que el Estado recaude fondos para financiar servicios públicos como educación, salud e infraestructura.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Evita problemas fiscales:</strong> Declarar correctamente los impuestos reduce el riesgo de auditorías o penalizaciones por evasión fiscal.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Acceso a beneficios:</strong> Facilita la obtención de créditos, licencias y otros beneficios fiscales.
              </li>
            </ul>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              En conclusión, la Declaración Jurada de Impuestos es una herramienta fundamental para garantizar el cumplimiento de las obligaciones tributarias y contribuir al bienestar económico del país.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
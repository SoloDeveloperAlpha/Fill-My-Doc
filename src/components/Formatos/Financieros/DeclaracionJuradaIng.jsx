import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/declaJurIng.png";


export default function DeclaracionJuradaIng() {
  const arregloInputs = [
    { label: "Localidad", type: "text", name: "localidad", placeholder: "Ej. Lima" },
    { label: "Nombre Completo del Declarante", type: "text", name: "nombreDeclarante", placeholder: "Ej. Juan Pérez" },
    { label: "Número de Documento de Identidad", type: "text", name: "dniDeclarante", placeholder: "Ej. 12345678" },
    { label: "Domicilio Actual", type: "text", name: "domicilio", placeholder: "Ej. Av. Siempre Viva 742" },
    { label: "Ocupación o Actividad Económica", type: "text", name: "ocupacion", placeholder: "Ej. Desarrollador Web" },
    { label: "Ingreso Mensual Aproximado", type: "number", name: "ingresoMensual", placeholder: "Monto en Soles" },
    { label: "Fuente Principal de Ingresos", type: "text", name: "fuenteIngresos", placeholder: "Ej. Trabajo independiente, empleo fijo" },
    { label: "Observaciones", type: "text", name: "observaciones", placeholder: "Información adicional (opcional)" }
  ];

  const [formData, formSetData] = useState({
    localidad: "",
    nombreDeclarante: "",
    dniDeclarante: "",
    domicilio: "",
    ocupacion: "",
    ingresoMensual: "",
    fuenteIngresos: "",
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
        title: "Declaración Jurada de Ingresos",
        subject: "Declaración Jurada de Ingresos",
        keywords: "Declaración, Jurada, Ingresos",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: "DECLARACIÓN JURADA DE INGRESOS",
                    bold: true,
                    size: 32,
                  }),
                ],
              }),
              new Paragraph({ text: "", spacing: { after: 200 } }),
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `Yo, ${formData.nombreDeclarante || "_____"}, identificado(a) con DNI número ${formData.dniDeclarante || "_____"}, domiciliado(a) en ${formData.domicilio || "_____"}, declaro bajo juramento lo siguiente:`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `1. Mi ocupación o actividad económica actual es ${formData.ocupacion || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `2. Percibo un ingreso mensual aproximado de ${formData.ingresoMensual || "_____"} soles.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `3. La fuente principal de mis ingresos proviene de ${formData.fuenteIngresos || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "4. Declaro que los ingresos mencionados son destinados a cubrir mis necesidades personales y familiares, así como a cumplir con mis obligaciones económicas y financieras.",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "5. Me comprometo a informar de manera veraz cualquier cambio significativo en mis ingresos o situación económica.",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "6. Reconozco que cualquier falsedad en la presente declaración podría dar lugar a las responsabilidades legales que correspondan.",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `Declaro asimismo que la presente información es exacta y completa, y la suscribo en la localidad de ${formData.localidad || "_____"}, a fecha ${new Date().toLocaleDateString()}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "", spacing: { after: 300 } }),
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({ text: "Observaciones:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.observaciones || "Ninguna"}`, size: 24 }),
                ],
              }),
              new Paragraph({ text: "", spacing: { after: 300 } }),
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: "______________________________",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: formData.nombreDeclarante || "Firma del Declarante",
                    size: 24,
                    underline: true,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "DeclaracionJuradaIngresos.docx");
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
          <Text style={styles.title}>Declaración Jurada de Ingresos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Yo, <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.nombreDeclarante || "_____"}</Text>, identificado(a) con DNI número <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.dniDeclarante || "_____"}</Text>, domiciliado(a) en <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.domicilio || "_____"}</Text>, declaro bajo juramento lo siguiente:
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            1. Mi ocupación o actividad económica actual es <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.ocupacion || "_____"}</Text>.
          </Text>
          <Text style={styles.text}>
            2. Percibo un ingreso mensual aproximado de <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.ingresoMensual || "_____"}</Text> soles.
          </Text>
          <Text style={styles.text}>
            3. La fuente principal de mis ingresos proviene de <Text style={{ backgroundColor: currentInput === 6 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.fuenteIngresos || "_____"}</Text>.
          </Text>
          <Text style={styles.text}>
            4. Declaro que los ingresos mencionados son destinados a cubrir mis necesidades personales y familiares, así como a cumplir con mis obligaciones económicas y financieras.
          </Text>
          <Text style={styles.text}>
            5. Me comprometo a informar de manera veraz cualquier cambio significativo en mis ingresos o situación económica.
          </Text>
          <Text style={styles.text}>
            6. Reconozco que cualquier falsedad en la presente declaración podría dar lugar a las responsabilidades legales que correspondan.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Declaro asimismo que la presente información es exacta y completa, y la suscribo en la localidad de <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.localidad || "_____"}</Text>, a fecha {new Date().toLocaleDateString()}.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Observaciones:</Text> <Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.observaciones || "Ninguna"}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>______________________________</Text>
          <Text style={{ ...styles.text }}><Text style={{ borderBottom: "1px solid black", width: "auto" }}>{formData.nombreDeclarante || "Firma del Declarante"}</Text></Text>
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
        <h2 style={{ paddingBlock: "10px" }}>Declaracion Jurada de Ingresos</h2>
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

export function DeclarJuradIngComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/declarJurIng/doc">
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
          <h1>Generador de Declaración Jurada de Ingresos</h1>
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
          <Link to="/document/content/declarJurIng/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Declaración Jurada de Ingresos?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>Declaración Jurada de Ingresos</strong> es un documento legal en el cual una persona manifiesta, bajo juramento, la cantidad de ingresos que percibe en un período determinado. Esta declaración se usa para diversos trámites administrativos, fiscales o judiciales y debe ser completada con información veraz, ya que su falsificación puede acarrear sanciones legales.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Por qué es importante realizar una Declaración Jurada de Ingresos?
            </h2>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Realizar una <strong style={{ color: "#007bff" }}>Declaración Jurada de Ingresos</strong> es fundamental por varias razones:
            </p>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Transparencia:</strong> Permite acreditar los ingresos de una persona ante instituciones gubernamentales o privadas.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Requerimiento Legal:</strong> En muchos casos, es obligatoria para la obtención de beneficios sociales o créditos bancarios.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Evita Sanciones:</strong> Brindar información falsa puede conllevar consecuencias legales.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Soporte para trámites:</strong> Facilita la gestión de procesos administrativos, como subsidios o becas.
              </li>
            </ul>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              En resumen, una Declaración Jurada de Ingresos es un instrumento esencial para demostrar la situación económica de una persona y garantizar que los procesos administrativos y financieros sean justos y transparentes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/contratoGen.png";

export default function ContratoUsoGeneral() {
  const arregloInputs = [
    { label: "Número de Contrato", type: "text", name: "numeroContrato", placeholder: "Ej. 001-2024" },
    { label: "Fecha del Contrato", type: "date", name: "fechaContrato", placeholder: "Selecciona una fecha" },

    { label: "Nombre del Contratante", type: "text", name: "nombreContratante", placeholder: "Ej. Juan Pérez" },
    { label: "Documento de Identidad del Contratante", type: "text", name: "dniContratante", placeholder: "Ej. 12345678" },
    { label: "Domicilio del Contratante", type: "text", name: "domicilioContratante", placeholder: "Ej. Av. Siempre Viva 742" },

    { label: "Nombre del Contratado", type: "text", name: "nombreContratado", placeholder: "Ej. Pedro Gómez" },
    { label: "Documento de Identidad del Contratado", type: "text", name: "dniContratado", placeholder: "Ej. 87654321" },
    { label: "Domicilio del Contratado", type: "text", name: "domicilioContratado", placeholder: "Ej. Jr. Los Cedros 123" },

    { label: "Objeto del Contrato", type: "text", name: "objetoContrato", placeholder: "Ej. Prestación de servicio, alquiler" },
    { label: "Plazo de Vigencia", type: "text", name: "plazoVigencia", placeholder: "Ej. 6 meses, 1 año" },

    { label: "Monto de Pago", type: "number", name: "montoPago", placeholder: "Ej. 1500" },
    { label: "Forma de Pago", type: "text", name: "formaPago", placeholder: "Ej. Transferencia bancaria, efectivo" },

    { label: "Fecha de Inicio", type: "date", name: "fechaInicio", placeholder: "Selecciona una fecha" },
    { label: "Fecha de Finalización", type: "date", name: "fechaFinalizacion", placeholder: "Selecciona una fecha" },

    { label: "Jurisdicción Aplicable", type: "text", name: "jurisdiccion", placeholder: "Ej. Lima, Perú" },

    { label: "Observaciones", type: "text", name: "observaciones", placeholder: "Información adicional (opcional)" }
  ];

  const [formData, setFormData] = useState({
    numeroContrato: "",
    fechaContrato: "",
    nombreContratante: "",
    dniContratante: "",
    domicilioContratante: "",
    nombreContratado: "",
    dniContratado: "",
    domicilioContratado: "",
    objetoContrato: "",
    plazoVigencia: "",
    montoPago: "",
    formaPago: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    jurisdiccion: "",
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
        title: "Contrato General",
        subject: "Contrato",
        keywords: "Contrato, General, Acuerdo",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: "CONTRATO GENERAL",
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
                    text: `Contrato N°: ${formData.numeroContrato || "_____"} \nFecha: ${formData.fechaContrato || "_____"}\n\nEntre las partes:`,

                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `El(la) Sr(a). ${formData.nombreContratante || "_____"}, identificado(a) con DNI número ${formData.dniContratante || "_____"}, con domicilio en ${formData.domicilioContratante || "_____"}, en adelante "El Contratante".`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `Y el(la) Sr(a). ${formData.nombreContratado || "_____"}, identificado(a) con DNI número ${formData.dniContratado || "_____"}, con domicilio en ${formData.domicilioContratado || "_____"}, en adelante "El Contratado".`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `Las partes acuerdan lo siguiente:`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `1. OBJETO DEL CONTRATO: ${formData.objetoContrato || "_____"}.\n\n`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `2. PLAZO DE VIGENCIA: ${formData.plazoVigencia || "_____"}.\n\n`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `3. MONTO Y FORMA DE PAGO: Se establece un pago de ${formData.montoPago || "_____"} soles, el cual será abonado mediante ${formData.formaPago || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `4. FECHAS DE EJECUCIÓN: Inicio: ${formData.fechaInicio || "_____"}, Finalización: ${formData.fechaFinalizacion || "_____"}.\n\n`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `5. JURISDICCIÓN: Para cualquier controversia derivada de este contrato, las partes acuerdan someterse a la jurisdicción de ${formData.jurisdiccion || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({ text: "Observaciones:", bold: true, size: 24 }),
                  new TextRun({
                    text: ` ${formData.observaciones || "Ninguna"}`,
                    size: 24,
                  }),
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
                    text: formData.nombreContratante || "Firma del Contratante",
                    size: 24,
                    underline: true,
                  }),
                ],
              }),

              new Paragraph({ text: "", spacing: { after: 200 } }),

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
                    text: formData.nombreContratado || "Firma del Contratado",
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
        saveAs(blob, "ContratoServicios.docx");
      });

      alert("Contrato generado y descargado con éxito");
    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };

  const ContratoGen = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>CONTRATO GENERAL</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Contrato N°: <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.numeroContrato || "_____"}</Text>  Fecha: <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.fechaContrato || "_____"}</Text>
          </Text>
          <Text style={styles.text}>
            Entre las partes:
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            El(la) Sr(a). <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.nombreContratante || "_____"}</Text>, identificado(a) con DNI número <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.dniContratante || "_____"}</Text>, domiciliado(a) en <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.domicilioContratante || "_____"}</Text>, en adelante "El Contratante".
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Y el(la) Sr(a). <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.nombreContratado || "_____"}</Text>, identificado(a) con DNI número <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dniContratado || "_____"}</Text>, domiciliado(a) en <Text style={{ backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.domicilioContratado || "_____"}</Text>, en adelante "El Contratado".
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Las partes acuerdan lo siguiente:</Text>
          <Text style={styles.text}>1. OBJETO DEL CONTRATO: <Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.objetoContrato || "_____"}</Text>.</Text>
          <Text style={styles.text}>2. PLAZO DE VIGENCIA: <Text style={{ backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.plazoVigencia || "_____"}</Text>.</Text>
          <Text style={styles.text}>3. MONTO Y FORMA DE PAGO: <Text style={{ backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{formData.montoPago || "_____"}</Text> soles, mediante <Text style={{ backgroundColor: currentInput === 11 ? "yellow" : "transparent" }}>{formData.formaPago || "_____"}</Text>.</Text>
          <Text style={styles.text}>4. FECHAS DE EJECUCIÓN: Inicio: <Text style={{ backgroundColor: currentInput === 12 ? "yellow" : "transparent" }}>{formData.fechaInicio || "_____"}</Text>, Finalización: <Text style={{ backgroundColor: currentInput === 13 ? "yellow" : "transparent" }}>{formData.fechaFinalizacion || "_____"}</Text>.</Text>
          <Text style={styles.text}>5. JURISDICCIÓN: <Text style={{ backgroundColor: currentInput === 14 ? "yellow" : "transparent" }}>{formData.jurisdiccion || "_____"}</Text>.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Observaciones:</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 15 ? "yellow" : "transparent" }}>{formData.observaciones || "Ninguna"}</Text>
        </View>

        <View style={styles.signature}>
          <Text>______________________________</Text>
          <Text>{formData.nombreContratante || "Firma del Contratante"}</Text>
        </View>

        <View style={styles.signature}>
          <Text>______________________________</Text>
          <Text>{formData.nombreContratado || "Firma del Contratado"}</Text>
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
    unicaCelda: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      padding: 1
    },
    masDeUnaCelda:
    {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-start",
      borderRight: "1px solid gray"
    },
    filaGruesa: {
      display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid gray", height: "15%"
    }


  });


  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 style={{ paddingBlock: "10px" }}>Contrato de Uso General</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)} tamano={arregloInputs.length} />

        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <label>{arregloInputs[currentInput].label}</label>
            <input
              type={arregloInputs[currentInput].type}
              name={arregloInputs[currentInput].name}
              placeholder={arregloInputs[currentInput].placeholder}
              value={formData[arregloInputs[currentInput].name] || ''}
              onChange={handleChange}
              style={{ width: "auto", height: "2em", padding: "10px", backgroundColor: "white", color: "black", outline: "none", border: "1px solid gray", borderRadius: "5px" }}
              required
            />

            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 && (
                <button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>
                  Atrás
                </button>
              )}

              {currentInput < arregloInputs.length - 1 ? (
                <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>
                  Paso siguiente <i className="ri-arrow-right-s-line"></i>
                </button>
              ) : (
                <>
                  <PDFDownloadLink document={<ContratoGen />} fileName="Contrato_de_Uso_General.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." :
                      <button type="button" style={{ backgroundColor: "tomato" }} onClick={() => setIsExportingPDF(true)}>
                        <i className="ri-save-fill"></i> PDF
                      </button>
                    )}
                  </PDFDownloadLink>

                  <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}>
                    <i className="ri-save-fill"></i> Word
                  </button>
                </>
              )}
            </div>
          </form>

          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <ContratoGen />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContratoUsoGeneralComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/contratGen/doc">
          <img src={contrato} alt="Contrato de Uso General" />
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
              <span>Contesta algunas preguntas y tu documento se generará automáticamente.</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-printer-fill"></i>
            <div className="paso">
              <h3>3. Guardar - Imprimir</h3>
              <span>Recibe tu documento en Word y PDF para modificarlo según sea necesario.</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-user-2-fill"></i>
            <div className="paso">
              <h3>4. Consultar a un abogado</h3>
              <span>Si lo deseas, puedes revisar el documento con un abogado.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col2">
        <div className="titulo">
          <h1>Generador de Contrato de Uso General</h1>
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
          <Link to="/document/content/contratGen/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es un Contrato de Uso General?
            </h1>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Un <strong style={{ color: "#007bff" }}>Contrato de Uso General</strong> es un documento legal mediante el cual una persona o entidad concede el derecho de uso de un bien, servicio o propiedad a otra parte, bajo términos y condiciones previamente acordados. Es fundamental para garantizar los derechos y deberes de ambas partes involucradas.
            </p>
            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Para qué sirve un Contrato de Uso General?
            </h2>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Este tipo de contrato es utilizado en diversas situaciones, tales como:
            </p>
            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Cesión de uso de bienes:</strong> Garantiza el acceso y regulación del uso de propiedades o servicios.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Condiciones de acceso:</strong> Define los términos en los que se permite el uso de un recurso.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Protección legal:</strong> Establece derechos y responsabilidades para evitar conflictos futuros.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Compromiso entre partes:</strong> Formaliza acuerdos de manera clara y segura.
              </li>
            </ul>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              En resumen, un Contrato de Uso General permite documentar acuerdos y establecer términos claros sobre el uso de bienes o servicios, asegurando un marco legal adecuado para todas las partes involucradas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

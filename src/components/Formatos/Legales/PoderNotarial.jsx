import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/poderNotarialSimple.png";

export default function PoderNotarial() {
  const arregloInputs = [
    { label: "Número de Poder", type: "text", name: "numeroPoder", placeholder: "Ej. 001-2024" },
    { label: "Fecha de Emisión", type: "date", name: "fechaEmision", placeholder: "Selecciona una fecha" },

    { label: "Nombre del Otorgante", type: "text", name: "nombreOtorgante", placeholder: "Ej. Juan Pérez" },
    { label: "Documento de Identidad del Otorgante", type: "text", name: "dniOtorgante", placeholder: "Ej. 12345678" },
    { label: "Domicilio del Otorgante", type: "text", name: "domicilioOtorgante", placeholder: "Ej. Av. Siempre Viva 742" },

    { label: "Nombre del Apoderado", type: "text", name: "nombreApoderado", placeholder: "Ej. Pedro Gómez" },
    { label: "Documento de Identidad del Apoderado", type: "text", name: "dniApoderado", placeholder: "Ej. 87654321" },
    { label: "Domicilio del Apoderado", type: "text", name: "domicilioApoderado", placeholder: "Ej. Jr. Los Cedros 123" },

    { label: "Tipo de Poder", type: "text", name: "tipoPoder", placeholder: "Ej. Poder General, Poder Especial" },
    { label: "Facultades Otorgadas", type: "textarea", name: "facultadesOtorgadas", placeholder: "Describe las facultades otorgadas" },

    { label: "Plazo de Vigencia", type: "text", name: "plazoVigencia", placeholder: "Ej. Indefinido, 1 año" },
    { label: "Notario Interviniente", type: "text", name: "notarioInterviniente", placeholder: "Ej. Dr. Luis Fernández" },

    { label: "Jurisdicción Aplicable", type: "text", name: "jurisdiccion", placeholder: "Ej. Lima, Perú" },

    { label: "Observaciones", type: "text", name: "observaciones", placeholder: "Información adicional (opcional)" }
  ];

  const [formData, setFormData] = useState({
    numeroPoder: "",
    fechaEmision: "",
    nombreOtorgante: "",
    dniOtorgante: "",
    domicilioOtorgante: "",
    nombreApoderado: "",
    dniApoderado: "",
    domicilioApoderado: "",
    tipoPoder: "",
    facultadesOtorgadas: "",
    plazoVigencia: "",
    notarioInterviniente: "",
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
        title: "Poder Notarial Simple",
        subject: "Poder Notarial",
        keywords: "Poder, Notarial, Documento",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: "PODER NOTARIAL SIMPLE",
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
                    text: `Número de Poder: ${formData.numeroPoder || "_____"} \nFecha de Emisión: ${formData.fechaEmision || "_____"}\n\n`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `Yo, ${formData.nombreOtorgante || "_____"}, identificado(a) con DNI número ${formData.dniOtorgante || "_____"}, con domicilio en ${formData.domicilioOtorgante || "_____"}, en adelante "El Otorgante", otorgo el presente poder a:`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `El(la) Sr(a). ${formData.nombreApoderado || "_____"}, identificado(a) con DNI número ${formData.dniApoderado || "_____"}, con domicilio en ${formData.domicilioApoderado || "_____"}, en adelante "El Apoderado".`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `En virtud del presente documento, el otorgante confiere a su apoderado las siguientes facultades:`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `1. Tipo de Poder: ${formData.tipoPoder || "_____"}.\n\n`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `2. Facultades Otorgadas: ${formData.facultadesOtorgadas || "_____"}.\n\n`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `3. Plazo de Vigencia del Poder: ${formData.plazoVigencia || "_____"}.`,
                    size: 24,
                  }),
                ],
              }),

              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: `Para la validez del presente documento, se ha contado con la intervención del Notario(a) ${formData.notarioInterviniente || "_____"}, bajo la jurisdicción de ${formData.jurisdiccion || "_____"}.`,
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
                    text: formData.nombreOtorgante || "Firma del Otorgante",
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
                    text: formData.nombreApoderado || "Firma del Apoderado",
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
        saveAs(blob, "PoderNotarialSimple.docx");
      });

      alert("Documento de Poder Notarial generado y descargado con éxito");
    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };

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
  const PoderNotarialPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>PODER NOTARIAL SIMPLE</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Número de Poder:</Text>
          <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.numeroPoder || "_____"}</Text>

          <Text style={styles.label}>Fecha de Emisión:</Text>
          <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.fechaEmision || "_____"}</Text>
        </View>

        <View style={styles.section}>
          <Text>
            Yo, <Text style={{ ...styles.underline, backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.nombreOtorgante || "_____"}</Text>, identificado(a) con
            DNI número <Text style={{ ...styles.underline, backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.dniOtorgante || "_____"}</Text>, con domicilio en{" "}
            <Text style={{ ...styles.underline, backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.domicilioOtorgante || "_____"}</Text>, en adelante "El Otorgante",
            otorgo el presente poder a:
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            El(la) Sr(a). <Text style={{ ...styles.underline, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.nombreApoderado || "_____"}</Text>, identificado(a) con
            DNI número <Text style={{ ...styles.underline, backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dniApoderado || "_____"}</Text>, con domicilio en{" "}
            <Text style={{ ...styles.underline, backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.domicilioApoderado || "_____"}</Text>, en adelante "El Apoderado".
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>En virtud del presente documento, el otorgante confiere a su apoderado las siguientes facultades:</Text>
        </View>

        <View style={styles.section}>
          <Text>1. Tipo de Poder: <Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.tipoPoder || "_____"}</Text></Text>
          <Text>2. Facultades Otorgadas: <Text style={{ backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.facultadesOtorgadas || "_____"}</Text></Text>
          <Text>3. Plazo de Vigencia del Poder: <Text style={{ backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{formData.plazoVigencia || "_____"}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text>
            Para la validez del presente documento, se ha contado con la intervención del Notario(a){" "}
            <Text style={{ ...styles.underline, backgroundColor: currentInput === 11 ? "yellow" : "transparent" }}>{formData.notarioInterviniente || "_____"}</Text>, bajo la jurisdicción de{" "}
            <Text style={{ ...styles.underline, backgroundColor: currentInput === 12 ? "yellow" : "transparent" }}>{formData.jurisdiccion || "_____"}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Observaciones:</Text>
          <Text style={{ backgroundColor: currentInput === 13 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.observaciones || "Ninguna"}</Text>
        </View>

        {/* Firmas */}
        <View style={styles.signature}>
          <Text>______________________________</Text>
          <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.nombreOtorgante || "Firma del Otorgante"}</Text>
        </View>

        <View style={styles.signature}>
          <Text>______________________________</Text>
          <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.nombreApoderado || "Firma del Apoderado"}</Text>
        </View>
      </Page>
    </Document >
  );

  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 style={{ paddingBlock: "10px" }}>Poder Notarial Simple</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)} tamano={arregloInputs.length} />
        <div className="columnas">
          <form className="col1" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <label>{arregloInputs[currentInput].label}</label>
            <input
              type={arregloInputs[currentInput].type}
              name={arregloInputs[currentInput].name}
              placeholder={arregloInputs[currentInput].placeholder}
              value={formData[arregloInputs[currentInput].name] || ''}
              onChange={handleChange}
              style={{ width: "auto", height: "2em", padding: "10px", borderRadius: "5px" }}
              required
            />

            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 && (
                <button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke" }}>
                  Atrás
                </button>
              )}

              {currentInput < arregloInputs.length - 1 ? (
                <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white" }}>
                  Paso siguiente <i className="ri-arrow-right-s-line"></i>
                </button>
              ) : (
                <>
                  <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}>
                    <i className="ri-save-fill"></i> Word
                  </button>
                  <PDFDownloadLink document={<PoderNotarialPDF formData={formData} />} fileName="Poder_Notarial.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." :
                      <button type="button" style={{ backgroundColor: "tomato" }} onClick={setIsExportingPDF(true)}>
                        <i className="ri-save-fill"></i> PDF
                      </button>
                    )}
                  </PDFDownloadLink>
                </>
              )}
            </div>
          </form>

          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <PoderNotarialPDF formData={formData} />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PoderNotarialComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/poderNotarial/doc">
          <img src={contrato} alt="Poder Notarial Simple" />
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
          <h1>Generador de Poder Notarial Simple</h1>
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
          <Link to="/document/content/poderNotarial/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es un Poder Notarial Simple?
            </h1>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Un <strong style={{ color: "#007bff" }}>Poder Notarial Simple</strong> es un documento legal mediante el cual una persona (el poderdante) otorga a otra persona (el apoderado) la facultad de actuar en su nombre en ciertos asuntos específicos. Este documento es fundamental cuando una persona no puede estar presente para realizar un trámite legal o administrativo.
            </p>
            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Por qué es importante un Poder Notarial Simple?
            </h2>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Este documento permite:
            </p>
            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Representación legal:</strong> Delegar trámites sin necesidad de estar presente.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Agilidad administrativa:</strong> Facilita procesos como gestiones bancarias, compra-venta de bienes, entre otros.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Seguridad jurídica:</strong> Establece límites y condiciones en las facultades otorgadas.
              </li>
            </ul>
            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Campos del Poder Notarial Simple
            </h2>
            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Datos del Poderdante:</strong> Nombre completo y datos de identificación de quien otorga el poder.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Datos del Apoderado:</strong> Información de la persona que recibe el poder.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Facultades otorgadas:</strong> Descripción clara de las acciones que el apoderado puede realizar en nombre del poderdante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Plazo de vigencia:</strong> Fecha en la que el poder notarial pierde validez si aplica.
              </li>
            </ul>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Un Poder Notarial Simple es una herramienta útil para facilitar gestiones importantes sin necesidad de la presencia física del otorgante, asegurando así comodidad y legalidad en cada trámite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/acuerdoNDA.png";

export default function AcuerdoConfNDA() {

  const arregloInputs = [
    { label: "Fecha de Firma", type: "date", name: "fechaFirma" },
    { label: "Nombre de la Parte Reveladora", type: "text", name: "nombreRevelador", placeholder: "Ej. Juan Pérez" },
    { label: "Nombre de la Parte Receptora", type: "text", name: "nombreReceptor", placeholder: "Ej. Empresa XYZ" },
    { label: "Tipo de Información Confidencial", type: "textarea", name: "tipoInformacion", placeholder: "Ej. Datos financieros, estrategias, etc." },
    { label: "Duración del Acuerdo (en años)", type: "number", name: "duracion", placeholder: "Ej. 5" },
    { label: "Excepciones a la Confidencialidad", type: "textarea", name: "excepciones", placeholder: "Ej. Información pública, autorizada, etc." },
    { label: "Jurisdicción Aplicable", type: "text", name: "jurisdiccion", placeholder: "Ej. Lima, Perú" }
  ];

  const [formData, setFormData] = useState({
    fechaFirma: "",
    nombreRevelador: "",
    nombreReceptor: "",
    tipoInformacion: "",
    duracion: "",
    excepciones: "",
    jurisdiccion: ""
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
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "ACUERDO DE CONFIDENCIALIDAD", bold: true, size: 32 }),
                ],
                alignment: "center",
              }),
              new Paragraph({
                children: [
                  new TextRun("Este Acuerdo de Confidencialidad (\"Acuerdo\") es celebrado el día "),
                  new TextRun({ text: formData.fechaFirma || "____", bold: true }),
                  new TextRun(" entre "),
                  new TextRun({ text: formData.nombreRevelador || "____", bold: true }),
                  new TextRun(", en adelante \"Parte Reveladora\", y "),
                  new TextRun({ text: formData.nombreReceptor || "____", bold: true }),
                  new TextRun(", en adelante \"Parte Receptora\". Ambas partes acuerdan los siguientes términos:"),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "1. Definición de Información Confidencial", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun("Para los fines de este Acuerdo, \"Información Confidencial\" se refiere a cualquier información, documento, "),
                  new TextRun("dato, plan estratégico, procedimiento técnico o material compartido por la Parte Reveladora, incluyendo pero no limitado a: "),
                  new TextRun({ text: formData.tipoInformacion || "____", bold: true }),
                  new TextRun(". Esta información podrá ser de naturaleza verbal, escrita, digital o cualquier otro formato reconocible."),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "2. Obligaciones de Confidencialidad", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun("La Parte Receptora se compromete a: \n- Mantener en estricta confidencialidad la Información Confidencial.\n"),
                  new TextRun("- No divulgar, copiar, reproducir ni transferir dicha información a terceros sin autorización escrita.\n"),
                  new TextRun("- Implementar medidas de seguridad para evitar filtraciones.\n"),
                  new TextRun("- Notificar de inmediato a la Parte Reveladora en caso de cualquier acceso no autorizado."),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "3. Duración del Acuerdo", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun("Este acuerdo tendrá una vigencia de "),
                  new TextRun({ text: formData.duracion || "____", bold: true }),
                  new TextRun(" años a partir de la fecha de firma, salvo que ambas partes acuerden por escrito su modificación o terminación anticipada."),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "4. Excepciones", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun("Este Acuerdo no se aplicará a información que:\n"),
                  new TextRun("- Sea de dominio público antes de su divulgación.\n"),
                  new TextRun("- Haya sido recibida legítimamente de un tercero sin obligación de confidencialidad.\n"),
                  new TextRun("- Sea requerida por ley o una orden judicial.\n"),
                  new TextRun("- Se detalle en el siguiente campo: "),
                  new TextRun({ text: formData.excepciones || "____", bold: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "8. Firmas", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun("______________________________"),
                  new TextRun({ text: formData.nombreRevelador || "Firma Parte Reveladora", bold: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun("______________________________"),
                  new TextRun({ text: formData.nombreReceptor || "Firma Parte Receptora", bold: true }),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Acuerdo_Confidencialidad.docx");
      });
    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };

  const NDAPDF = () => (
    <Document>
      {/* Página 1 */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>ACUERDO DE CONFIDENCIALIDAD NDA</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Este Acuerdo de Confidencialidad ("Acuerdo") es celebrado el día
            <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}> {formData.fechaFirma || "____"} </Text>
            entre <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.nombreRevelador || "____"}</Text>,
            en adelante "Parte Reveladora", y <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.nombreReceptor || "____"}</Text>,
            en adelante "Parte Receptora". Ambas partes acuerdan los siguientes términos:
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>1. Definición de Información Confidencial</Text>
          <Text style={styles.text}>
            Para los fines de este Acuerdo, "Información Confidencial" se refiere a cualquier información, documento,
            dato, plan estratégico, procedimiento técnico o material compartido por la Parte Reveladora, incluyendo pero no limitado a:
            <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.tipoInformacion || "____"}</Text>.
            Esta información podrá ser de naturaleza verbal, escrita, digital o cualquier otro formato reconocible.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>2. Obligaciones de Confidencialidad</Text>
          <Text style={styles.text}>
            La Parte Receptora se compromete a:
            {"\n"}- Mantener en estricta confidencialidad la Información Confidencial.
            {"\n"}- No divulgar, copiar, reproducir ni transferir dicha información a terceros sin autorización escrita.
            {"\n"}- Implementar medidas de seguridad para evitar filtraciones.
            {"\n"}- Notificar de inmediato a la Parte Reveladora en caso de cualquier acceso no autorizado.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>3. Duración del Acuerdo</Text>
          <Text style={styles.text}>
            Este acuerdo tendrá una vigencia de
            <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.duracion || "____"}</Text>
            años a partir de la fecha de firma, salvo que ambas partes acuerden por escrito su modificación o terminación anticipada.
          </Text>
        </View>
      </Page>

      {/* Página 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>4. Excepciones</Text>
          <Text style={styles.text}>
            Este Acuerdo no se aplicará a información que:
            {"\n"}- Sea de dominio público antes de su divulgación.
            {"\n"}- Haya sido recibida legítimamente de un tercero sin obligación de confidencialidad.
            {"\n"}- Sea requerida por ley o una orden judicial.
            {"\n"}- Se detalle en el siguiente campo:
            <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.excepciones || "____"}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>5. Responsabilidades Adicionales</Text>
          <Text style={styles.text}>
            La Parte Receptora se obliga a utilizar la Información Confidencial únicamente para los propósitos autorizados
            y dentro del ámbito de su relación profesional con la Parte Reveladora. Cualquier uso indebido podrá dar lugar
            a sanciones según lo establecido en este acuerdo.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>6. Penalización por Incumplimiento</Text>
          <Text style={styles.text}>
            En caso de incumplimiento de las cláusulas de confidencialidad, la Parte Reveladora podrá exigir:
            {"\n"}- La restitución de la información y la inmediata suspensión de su uso.
            {"\n"}- Compensación por daños y perjuicios generados.
            {"\n"}- La imposición de sanciones económicas o legales según la jurisdicción de
            <Text style={{ backgroundColor: currentInput === 6 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.jurisdiccion || "____"}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>7. Jurisdicción</Text>
          <Text style={styles.text}>
            Cualquier disputa derivada de este Acuerdo será resuelta conforme a las leyes de
            <Text style={{ backgroundColor: currentInput === 6 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.jurisdiccion || "____"}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>8. Firmas</Text>
          <Text style={styles.text}>En prueba de conformidad, ambas partes firman este Acuerdo:</Text>
        </View>

        <View style={styles.firmaContainer}>
          <Text style={styles.text}>______________________________</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>
            {formData.nombreRevelador || "Firma Parte Reveladora"}
          </Text>
        </View>

        <View style={styles.firmaContainer}>
          <Text style={styles.text}>______________________________</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>
            {formData.nombreReceptor || "Firma Parte Receptora"}
          </Text>
        </View>
      </Page>
    </Document>
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
        <h2 style={{ paddingBlock: "10px" }}>Acuerdo de Confidencialidad NDA</h2>
        <ProgressBar
          percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)}
          tamano={arregloInputs.length}
        />
        <div className="columnas">
          <form
            className="col1"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1em" }}
          >
            <label>{arregloInputs[currentInput].label}</label>

            {arregloInputs[currentInput].type === "textarea" ? (
              <textarea
                name={arregloInputs[currentInput].name}
                placeholder={arregloInputs[currentInput].placeholder}
                value={formData[arregloInputs[currentInput].name] || ""}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type={arregloInputs[currentInput].type}
                name={arregloInputs[currentInput].name}
                placeholder={arregloInputs[currentInput].placeholder}
                value={formData[arregloInputs[currentInput].name] || ""}
                onChange={handleChange}
                required
              />
            )}

            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}
                >
                  Atrás
                </button>
              )}
              {currentInput < arregloInputs.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}
                >
                  Paso siguiente <i className="ri-arrow-right-s-line"></i>
                </button>
              ) : (
                <>
                  <PDFDownloadLink document={<NDAPDF />} fileName="Acuerdo_Confidencialidad.pdf">
                    {({ loading }) =>
                      loading ? (
                        "Generando PDF..."
                      ) : (
                        <button
                          type="button"
                          style={{ backgroundColor: "tomato" }}
                          onClick={() => setIsExportingPDF(true)}
                        >
                          <i className="ri-save-fill"></i> PDF
                        </button>
                      )
                    }
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
              <NDAPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );

}

export function AcuerdoNDAComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/acuerdoNDA/doc">
          <img src={contrato} alt="Acuerdo de Confidencialidad" />
        </Link>
        <div className="pasos">
          <h2>¿Cómo funciona?</h2>
          <div className="tarjeta_pasos">
            <i className="ri-file-text-line"></i>
            <div className="paso">
              <h3>1. Elegir este modelo</h3>
              <span>Haz clic en "Rellenar el modelo" para comenzar.</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-pencil-fill"></i>
            <div className="paso">
              <h3>2. Rellenar el documento</h3>
              <span>Responde algunas preguntas y generaremos el acuerdo automáticamente.</span>
            </div>
          </div>
          <div className="tarjeta_pasos">
            <i className="ri-printer-fill"></i>
            <div className="paso">
              <h3>3. Guardar - Imprimir</h3>
              <span>Recibirás tu documento en formatos Word y PDF para modificarlo si es necesario.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col2">
        <div className="titulo">
          <h1>Generador de Acuerdo de Confidencialidad</h1>
          <div className="details">
            <div className="card2">
              <h3>Formatos</h3>
              <span><i className="ri-file-text-line"></i> Word y PDF</span>
            </div>
            <div className="card3">
              <h3>Tamaño</h3>
              <span><i className="ri-expand-vertical-s-line"></i> 1-2 páginas</span>
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
          <Link to="/document/content/acuerdoNDA/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es un Acuerdo de Confidencialidad?
            </h1>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Un <strong style={{ color: "#007bff" }}>Acuerdo de Confidencialidad (NDA)</strong> es un contrato legal en el que una parte se compromete a no divulgar información confidencial de la otra parte. Se usa en negocios, asociaciones estratégicas y empleo.
            </p>
            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Por qué es importante?
            </h2>
            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Protección de información:</strong> Evita filtraciones de datos sensibles.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Seguridad legal:</strong> Brinda respaldo ante posibles incumplimientos.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Confianza en negocios:</strong> Permite compartir información clave con seguridad.
              </li>
            </ul>
            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Elementos esenciales del NDA
            </h2>
            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Partes involucradas:</strong> Quiénes firman el acuerdo.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Información protegida:</strong> Datos considerados confidenciales.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Duración:</strong> Tiempo de vigencia del acuerdo.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Consecuencias legales:</strong> Qué sucede en caso de incumplimiento.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
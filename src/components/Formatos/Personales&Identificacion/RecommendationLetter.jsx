import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from "../../Loadings/ProgressBar.jsx";
import contrato from "../../../assets/carta_recomenda.png";
import { Link } from "react-router-dom";

export default function RecommendationLetter() {
  const [currentInput, setCurrentInput] = useState(0);
  const dataContenido = [
    { label: "Nombre del Recomendado:", type: "input", name: "nombre", placeholder: "Ingrese el Nombre" },
    { textarea: "Cualidades del recomendado:", type: "textarea", name: "qualities", placeholder: "Ingrese sus cualidades" },
    { label: "Relacion y Duración:", type: "input", name: "relationship", placeholder: "Relacion y Duracion" },
    { textarea: "Fortalezas:", type: "textarea", name: "strengths", placeholder: "Fortalezas" },
    { textarea: "Atributos destacados:", type: "textarea", name: "attributes", placeholder: "Atributos destacados" },
    { label: "Tu Nombre:", type: "input", name: "recommenderName", placeholder: "Tu Nombre" },
    { label: "Tu Teléfono:", type: "input", name: "recommenderPhone", placeholder: "Tu Teléfono" },
    { label: "Tu Email:", type: "input", name: "recommenderEmail", placeholder: "Tu Email" },
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    qualities: "",
    relationship: "",
    strengths: "",
    attributes: "",
    recommenderName: "",
    recommenderPhone: "",
    recommenderEmail: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentInput > 0) {
      setCurrentInput(currentInput - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentInput < dataContenido.length - 1) {
      setCurrentInput(currentInput + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Formulario enviado");
  };

  const RecommendationLetterPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Carta de Recomendación</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>A quien corresponda:</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>
            Me permito recomendar al Sr./Sra. <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombre || "__________"}</Text>, quien ha demostrado ser una persona <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.qualities || "__________"}</Text> durante el tiempo que lo/la he conocido, <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.relationship || "__________"}</Text>.
          </Text>
          <Text style={styles.text}>
            Durante este tiempo, ha destacado por su <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.strengths || "__________"}</Text> , y siempre ha mostrado <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.attributes || "__________"}</Text> .
          </Text>
          <Text style={styles.text}>
            Estoy seguro de que su desempeño será igual de destacado en cualquier rol que decida asumir.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Quedo a su disposición para brindar cualquier información adicional.</Text>
          <Text style={styles.text}>Atentamente,</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.recommenderName || "__________"}</Text>
          <View style={{ height: 30 }}></View>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>Teléfono: {formData.recommenderPhone || "__________"}</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>Email: {formData.recommenderEmail || "__________"}</Text>
        </View>
      </Page>
    </Document >
  );

  const styles = StyleSheet.create({
    page: {
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", padding: 40, fontSize: 12, lineHeight: 1.5
    },
    section: { marginBottom: 10 },
    title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
    text: { fontSize: 12, marginBottom: 5 }
  });

  const generateWordDocument = () => {
    const doc = new Doc({
      sections: [
        {
          properties: {},
          font: "Arial",
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Carta de Recomendación", bold: true, size: 32 })
              ],
              spacing: { line: 700 }
            }),
            new Paragraph({
              children: [
                new TextRun(`A quien corresponda:`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Me permito recomendar al Sr./Sra. ${formData.nombre || "__________"}, quien ha demostrado ser una persona ${formData.qualities || "__________"} durante el tiempo que lo/la he conocido, ${formData.relationship || "__________"}. Durante este tiempo, ha destacado por su ${formData.strengths || "__________"}, y siempre ha mostrado ${formData.attributes || "__________"}.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Estoy seguro de que su desempeño será igual de destacado en cualquier rol que decida asumir.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Quedo a su disposición para brindar cualquier información adicional.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Atentamente,`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`${formData.recommenderName || "__________"}`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Teléfono: ${formData.recommenderPhone || "__________"}`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Email: ${formData.recommenderEmail || "__________"}`)
              ],
              spacing: { line: 300 }
            })
          ]
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Carta_de_Recomendacion.docx");
    });
  };



  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 className="text-xl font-bold mb-4">Generador de Carta de Recomendación</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / dataContenido.length)} tamano={dataContenido.length} />
        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {dataContenido[currentInput].type === "input" ? (<div style={{ display: "flex", flexDirection: "column" }}>
                <label>{dataContenido[currentInput].label}</label>
                <input type="text" name={dataContenido[currentInput].name} placeholder={dataContenido[currentInput].placeholder} value={formData[dataContenido[currentInput].name] || ""} onChange={handleInputChange} style={{ width: "100%", height: "2em", textIndent: "10px", border: "1px solid gray", outline: "none" }} />
              </div>) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>{dataContenido[currentInput].textarea}</label>
                  <textarea name={dataContenido[currentInput].name} id={dataContenido[currentInput].name} onChange={handleInputChange} rows="10" style={{ backgroundColor: "white", color: "black", resize: "none", padding: "5px", border: "1px solid gray", outline: "none" }}>{formData[dataContenido[currentInput].name] || ""}</textarea>
                </div>
              )}
              <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                {currentInput > 0 ? (<button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Atrás</button>) : null}
                {currentInput < dataContenido.length - 1 ? (
                  <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Paso siguiente <i className="ri-arrow-right-s-line"></i></button>
                ) : (
                  <>
                    <PDFDownloadLink document={<RecommendationLetterPDF />} fileName="Carta_de_Recomendacion.pdf">
                      {({ loading }) => (loading ? "Generando PDF..." : <button type="button" style={{ backgroundColor: "tomato" }}><i className="ri-save-fill"></i> PDF</button>)}
                    </PDFDownloadLink>
                    <button onClick={generateWordDocument} style={{ backgroundColor: "var(--ColorFont1)" }}><i className="ri-save-fill"></i> Word</button>
                  </>
                )}
              </div>
            </div>
          </form>
          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <RecommendationLetterPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
};


export function RecommendationComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/recLetter/doc">
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
          <h1>Generador de Carta de Recomendación</h1>
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
          <Link to="/document/content/recLetter/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "#333", textAlign: "center" }}>
              ¿Qué es una Carta de Recomendación?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>carta de recomendación</strong> es un documento en el que una persona, generalmente un empleador, profesor o colega, describe y avala las capacidades, habilidades y carácter de otra persona. Es comúnmente utilizada en procesos de selección de empleo, estudios o proyectos.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Qué información debe contener?
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Nombre del Recomendado:</strong> Campo para ingresar el nombre completo de la persona a la que estás recomendando.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Cualidades del Recomendado:</strong> Espacio para describir las cualidades positivas del recomendado, como su ética de trabajo o habilidades interpersonales.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Relación y Duración:</strong> Campo para especificar tu relación con el recomendado (por ejemplo, compañero de trabajo, amigo) y el tiempo que han estado en contacto.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fortalezas:</strong> Describe las fortalezas profesionales o personales del recomendado, como "Resolución de problemas" o "Liderazgo".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Atributos Destacados:</strong> Espacio para detallar atributos específicos que hacen al recomendado sobresalir, como "Creatividad" o "Excelente comunicación".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Tu Nombre:</strong> Campo para escribir tu nombre completo como recomendador.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Tu Teléfono:</strong> Ingreso de tu número de contacto para que puedan comunicarse contigo si es necesario.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Tu Email:</strong> Campo para ingresar tu correo electrónico como recomendador.
              </li>
            </ul>


            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una carta de recomendación bien redactada puede ser un factor decisivo en la selección de un candidato. Es importante que sea clara, específica y genuina, destacando aspectos relevantes que hagan destacar a la persona recomendada.
            </p>
          </div>
        </div>
      </div>
    </div>


  );
}
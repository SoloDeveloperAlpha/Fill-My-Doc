import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from "../../Loadings/ProgressBar.jsx";
import contrato from "../../../assets/carta_renuncia.png";
import { Link } from "react-router-dom";

export default function CartaRenuncia() {
  const [currentInput, setCurrentInput] = useState(0);
  const dataContenido = [
    { label: "Nombre del Jefe o Superior:", type: "text", name: "jefe", placeholder: "Ingrese el Nombre" },
    { label: "Cargo que desempeñaba:", type: "text", name: "cargo", placeholder: "Ingresa tu Cargo" },
    { label: "Empresa:", type: "text", name: "empresa", placeholder: "Nombre de la Empresa" },
    { label: "Fecha del ultimo dia a laborar:", type: "date", name: "ultimodia", placeholder: "Ultima fecha a laborar" },
    { textarea: "Razon breve profesional o personal:", tipo: "textarea", name: "razon", placeholder: "Motivos..." },
    { label: "Firma", type: "text", name: "firmarenunciante", placeholder: "Firma Renunciante" },
  ];

  const [formData, setFormData] = useState({
    jefe: "",
    cargo: "",
    empresa: "",
    ultimodia: "",
    razon: "",
    firmarenunciante: ""
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

  const ResignationLetterPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Carta de Renuncia</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>Estimado(a) <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>
            {formData.jefe || "_____"}
          </Text></Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>
            Por la presente, me permito presentar mi renuncia formal al cargo de <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.cargo || "_____"}</Text> en <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.empresa || "_____"}</Text>, con efecto a partir del <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.ultimodia || "_____"}</Text>.
          </Text>
          <Text style={styles.text}>
            Esta decisión ha sido cuidadosamente considerada y obedece a <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.razon || "_____"}</Text>.
          </Text>
          <Text style={styles.text}>
            Quisiera expresar mi más sincero agradecimiento por la oportunidad de haber sido parte de esta organización. Durante mi tiempo aquí, he adquirido valiosas experiencias y aprendizajes que me han permitido crecer profesional y personalmente. Aprecio profundamente el apoyo brindado por usted y por el equipo durante mi estancia.
          </Text>
          <Text style={styles.text}>
            Me comprometo a colaborar en la transición de mis responsabilidades y dejar todo en orden para minimizar cualquier inconveniente. Quedo a su disposición para capacitar a quien ocupe mi puesto o atender cualquier asunto pendiente.
          </Text>
          <Text style={styles.text}>
            Le reitero mi gratitud y mis mejores deseos para el futuro éxito de <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.empresa || "_____"}</Text>. Espero que podamos mantener una relación cordial en el futuro.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Quedo a su disposición para brindar cualquier información adicional.</Text>
          <Text style={styles.text}>Atentamente,</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.firmarenunciante || "__________"}</Text>
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
                new TextRun({ text: "Carta de Renuncia", bold: true, size: 32 })
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
                new TextRun(`Por la presente, me permito presentar mi renuncia formal al cargo de ${formData.cargo || "_____"} en ${formData.empresa || "_____"}, con efecto a partir del ${formData.ultimodia || "_____"}.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Esta decisión ha sido cuidadosamente considerada y obedece a ${formData.razon || "_____"}.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Quisiera expresar mi más sincero agradecimiento por la oportunidad de haber sido parte de esta organización. Durante mi tiempo aquí, he adquirido valiosas experiencias y aprendizajes que me han permitido crecer profesional y personalmente. Aprecio profundamente el apoyo brindado por usted y por el equipo durante mi estancia.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Me comprometo a colaborar en la transición de mis responsabilidades y dejar todo en orden para minimizar cualquier inconveniente. Quedo a su disposición para capacitar a quien ocupe mi puesto o atender cualquier asunto pendiente.`)
              ],
              spacing: { line: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Le reitero mi gratitud y mis mejores deseos para el futuro éxito de ${formData.empresa || "_____"}. Espero que podamos mantener una relación cordial en el futuro.`)
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
                new TextRun(`${formData.firmarenunciante || "__________"}`)
              ],
              spacing: { line: 300 }
            })
          ]
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Carta_de_Renuncia.docx");
    });
  };



  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 className="text-xl font-bold mb-4">Generador de Carta de Renuncia</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / dataContenido.length)} tamano={dataContenido.length} />
        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {dataContenido[currentInput].name != "razon" ? (<div style={{ display: "flex", flexDirection: "column" }}>
                <label>{dataContenido[currentInput].label}</label>
                <input type={dataContenido[currentInput].type} name={dataContenido[currentInput].name} placeholder={dataContenido[currentInput].placeholder} value={formData[dataContenido[currentInput].name] || ""} onChange={handleInputChange} style={{ width: "100%", height: "2em", textIndent: "10px", border: "1px solid gray", outline: "none" }} />
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
                    <PDFDownloadLink document={<ResignationLetterPDF />} fileName="Carta_de_Renuncia.pdf">
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
              <ResignationLetterPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
};


export function RenunciaComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/Fill-My-Doc/document/content/cartaRenuncia/doc">
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
          <h1>Generador de Carta de Renuncia</h1>
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
          <Link to="/Fill-My-Doc/document/content/cartaRenuncia/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", textAlign: "center", paddingBlockEnd: "1em", color: "var(--ColorFont1)" }}>
              ¿Qué es una Carta de Renuncia?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#d9534f" }}>carta de renuncia</strong> es un documento formal mediante el cual un trabajador notifica a su empleador su decisión de finalizar la relación laboral. Esta comunicación debe ser clara, respetuosa y cumplir con los tiempos de preaviso establecidos en la legislación laboral o contrato correspondiente.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Cuáles son sus elementos principales?
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Nombre del Jefe o Superior:</strong> Campo para ingresar el nombre completo de tu jefe o superior directo al que va dirigida la carta de renuncia.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Cargo que desempeñaba:</strong> Campo para indicar el puesto que ocupabas en la empresa.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Empresa:</strong> Espacio para especificar el nombre de la empresa en la que trabajas.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha del último día a laborar:</strong> Campo para ingresar la fecha en la que planeas dejar de trabajar en la empresa.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Razón breve profesional o personal:</strong> Espacio para escribir una razón breve pero profesional sobre tu decisión de renunciar, como "nuevos retos profesionales" o "motivos personales".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Firma:</strong> Campo para incluir tu nombre o firma digital como renunciante.
              </li>
            </ul>


            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Redactar una carta de renuncia formal y cortés ayuda a mantener una relación profesional positiva y facilita una transición laboral adecuada.
            </p>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Recuerda que siempre es buena práctica dejar una buena impresión, incluso al terminar una relación laboral.
            </p>
          </div>

        </div>
      </div>
    </div>


  );
}
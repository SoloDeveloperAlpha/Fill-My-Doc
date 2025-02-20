import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from "../../Loadings/ProgressBar.jsx";
import contrato from "../../../assets/CartaAuto.jpg";
import { Link } from "react-router-dom";


export default function CartaAutorizacion() {
  const [currentInput, setCurrentInput] = useState(0);
  const dataContenido = [
    { label: "Destinatario:", type: "text", name: "destinatario", placeholder: "Nombre del Destinatario" },
    { label: "Solicitante:", type: "text", name: "nombresolicitante", placeholder: "Ingrese un Nombre" },
    { label: "DNI del Solicitante:", type: "text", name: "dni", placeholder: "Ingrese su DNI" },
    { label: "Persona a la que Autoriza:", type: "text", name: "personaAutorizada", placeholder: "Nombre de persona Autorizada" },
    { label: "DNI del Autorizado:", type: "text", name: "dniAutorizada", placeholder: "Ingrese su DNI" },
    { textarea: "Gestiones o acciones:", tipo: "textarea", name: "gestiones", placeholder: "Detallar..." },
    { label: "Fecha de Inicio:", type: "date", name: "fec_inicio" },
    { label: "Fecha de Finalizacion:", type: "date", name: "fec_final" },
    { label: "Firma:", type: "text", name: "firma", placeholder: "Ingresa Nombre Completo" }
  ];

  const [formData, setFormData] = useState({
    destinatario: "",
    nombresolicitante: "",
    dni: "",
    personaAutorizada: "",
    dniAutorizada: "",
    gestiones: "",
    fec_inicio: "",
    fec_final: "",
    firma: ""
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

  const AutorizationLetterPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Carta de Autorización</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>Estimado(a): <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>
            {formData.destinatario || "_____"}
          </Text></Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>
            Por la presente, yo, <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.nombresolicitante || "______"}</Text>, con DNI/Número de identificación <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.dni || "______"}</Text>, autorizo a <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.personaAutorizada || "______"}</Text>, quien se identifica con <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.dniAutorizada || "______"}</Text>, a realizar las siguientes gestiones en mi nombre:
          </Text>.
          <Text style={{ ...styles.text, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>
            {formData.gestiones || "_____"}.
          </Text>
          <Text style={styles.text}>
            De esta forma hago presente la formalidad para que quede constancia de la autorizacion de sus funciones por mi parte , siendo yo el absoluto responsable de ello.
          </Text>
          <Text style={styles.text}>
            Esta autorización sera válida desde <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.fec_inicio || "______"}</Text> hasta <Text style={{ backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.fec_final || "______"}</Text>.
          </Text>
          <Text style={styles.text}>
            Le reitero mi gratitud y mis mejores deseos para el futuro éxito de <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.destinatario || "_____"}</Text>. Espero que podamos mantener una relación cordial en el futuro.
          </Text>
          <Text style={styles.text}>
            Agradezco de antemano su colaboración y quedo a su disposición para cualquier consulta adicional.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Atentamente,</Text>
          <Text style={{ ...styles.text, backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.firma || "__________"}</Text>
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
        <h2 className="text-xl font-bold mb-4">Generador de Carta de Autorizacion</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / dataContenido.length)} tamano={dataContenido.length} />
        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {dataContenido[currentInput].name != "gestiones" ? (<div style={{ display: "flex", flexDirection: "column" }}>
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
                    <PDFDownloadLink document={<AutorizationLetterPDF />} fileName="Carta_de_Renuncia.pdf">
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
              <AutorizationLetterPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
};


export function AutorizacionComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/Fill-My-Doc/document/content/cartaAutorizacion/doc">
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
          <h1>Generador de Carta de Autorizacion</h1>
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
          <Link to="/Fill-My-Doc/document/content/cartaAutorizacion/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Carta de Autorización?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>carta de autorización</strong> es un documento formal mediante el cual una persona (denominada otorgante) concede permiso a otra (denominada autorizado) para realizar algún trámite, actividad o recibir información en su nombre. Este tipo de carta es común en contextos personales, laborales, administrativos y legales.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Características principales:
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Destinatario:</strong> Persona o entidad a la que se dirige la carta de autorización, como una institución o empresa.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Solicitante:</strong> Nombre completo de la persona que otorga la autorización.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>DNI del Solicitante:</strong> Documento Nacional de Identidad del solicitante que autoriza.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Persona a la que Autoriza:</strong> Nombre completo de la persona que recibirá la autorización.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>DNI del Autorizado:</strong> Documento Nacional de Identidad de la persona autorizada.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Gestiones o acciones:</strong> Detalle de las gestiones, trámites o acciones específicas que la persona autorizada podrá realizar.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha de Inicio:</strong> Día en que comienza la vigencia de la autorización.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha de Finalización:</strong> Día en que termina la vigencia de la autorización.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Firma:</strong> Espacio para incluir tu firma o nombre completo como señal de conformidad.
              </li>
            </ul>


            <p style={{ fontSize: "16px", color: "#555" }}>
              Este documento permite delegar responsabilidades temporalmente y debe ser redactado de manera clara y precisa para evitar malentendidos.
            </p>
          </div>
        </div>
      </div>
    </div>


  );
}
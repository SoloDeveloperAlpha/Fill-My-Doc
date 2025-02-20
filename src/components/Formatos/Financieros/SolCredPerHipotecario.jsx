import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/formCntaBnc.png";


export default function SolCredPerHipot() {
  const arregloInputs = [
    { label: "Nombre Completo", type: "text", name: "nombre", placeholder: "Ej: Juan Pérez" },
    { label: "Número de Documento", type: "text", name: "documento", placeholder: "Ej: 12345678" },
    { label: "Fecha de Nacimiento", type: "date", name: "fechaNacimiento", placeholder: "" },
    { label: "Estado Civil", type: "select", name: "estadoCivil", options: ["Soltero(a)", "Casado(a)", "Divorciado(a)", "Viudo(a)"] },
    { label: "Dirección", type: "text", name: "direccion", placeholder: "Ej: Calle Principal 123" },
    { label: "Ciudad", type: "text", name: "ciudad", placeholder: "Ej: Lima" },
    { label: "Código Postal", type: "text", name: "codigoPostal", placeholder: "Ej: 07112" },
    { label: "Número de Teléfono", type: "text", name: "telefono", placeholder: "Ej: +51998765432" },
    { label: "Correo Electrónico", type: "email", name: "email", placeholder: "Ej: juan.perez@gmail.com" },
    { label: "Tipo de Crédito", type: "select", name: "tipoCredito", options: ["Personal", "Hipotecario"] },
    { label: "Monto Solicitado", type: "number", name: "montoSolicitado", placeholder: "Ej: 50000" },
    { label: "Plazo del Préstamo (en meses)", type: "number", name: "plazo", placeholder: "Ej: 36" },
    { label: "Destino del Crédito", type: "text", name: "destinoCredito", placeholder: "Ej: Compra de vehículo" },
    { label: "Ingresos Mensuales", type: "number", name: "ingresos", placeholder: "Ej: 5000" },
    { label: "Nombre del Empleador", type: "text", name: "empleador", placeholder: "Ej: Empresa XYZ" },
    { label: "Tiempo en el Empleo (en años)", type: "number", name: "tiempoEmpleo", placeholder: "Ej: 3" },
    { label: "Tipo de Contrato", type: "select", name: "tipoContrato", options: ["Indefinido", "Temporal", "Por proyecto", "Freelance"] },
    { label: "Referencias Personales (Nombre y Teléfono)", type: "text", name: "referencias", placeholder: "Ej: Carlos Pérez, +51912345678" },
    { label: "Garantía (para Crédito Hipotecario)", type: "text", name: "garantia", placeholder: "Ej: Propiedad en Lima" },
    { label: "Historial Crediticio (otros préstamos)", type: "textarea", name: "historialCrediticio", placeholder: "Ej: Préstamo de auto con Banco ABC" }
  ];


  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    fechaNacimiento: "",
    estadoCivil: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
    tipoCredito: "",
    montoSolicitado: "",
    plazo: "",
    destinoCredito: "",
    ingresos: "",
    empleador: "",
    tiempoEmpleo: "",
    tipoContrato: "",
    referencias: "",
    garantia: "",
    historialCrediticio: ""
  });


  const [currentInput, setCurrentInput] = useState(0);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const handleInputChange = (e) => {
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
    console.log(formData);
    alert("Formulario enviado con éxito");
  };

  const SolicitudCreditoPDF = () => {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Formulario Solicitud de Crédito Personal o Hipotecario</Text>
          <View style={{ ...styles.bordeTabla, height: "auto" }}>
            {/* Datos Personales */}
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Nombre Completo:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombre || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Número de Documento:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.documento || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Fecha de Nacimiento:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.fechaNacimiento || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Estado Civil:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.estadoCivil || "N/A"}</Text>
              </View>
            </View>

            {/* Información de Contacto */}
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Dirección:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.direccion || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Ciudad:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.ciudad || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Código Postal:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.codigoPostal || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.telefono || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Correo Electrónico:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.email || "N/A"}</Text>
              </View>
            </View>

            {/* Información Financiera */}
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Tipo de Crédito:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.tipoCredito || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Monto Solicitado:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{formData.montoSolicitado || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Plazo:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 11 ? "yellow" : "transparent" }}>{formData.plazo || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Destino del Crédito:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 12 ? "yellow" : "transparent" }}>{formData.destinoCredito || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Ingresos Mensuales:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 13 ? "yellow" : "transparent" }}>{formData.ingresos || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Empleador:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 14 ? "yellow" : "transparent" }}>{formData.empleador || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Tiempo de Empleo:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 15 ? "yellow" : "transparent" }}>{formData.tiempoEmpleo || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Tipo de Contrato:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 16 ? "yellow" : "transparent" }}>{formData.tipoContrato || "N/A"}</Text>
              </View>
            </View>

            {/* Información Adicional */}
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Referencias:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 17 ? "yellow" : "transparent" }}>{formData.referencias || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Garantía:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 18 ? "yellow" : "transparent" }}>{formData.garantia || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Historial Crediticio:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 19 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.historialCrediticio || "N/A"}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document >
    );
  };



  const styles = StyleSheet.create({
    page: {
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40, fontSize: 12, lineHeight: 1.5
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

  const handleWord = (e) => {
    e.preventDefault();

    try {
      const doc = new Doc({
        creator: "Mi Aplicación",
        title: "Formulario de Solicitud de Credito Hipotecario",
        subject: "Formulario de Solicitud de Credito Hipotecario",
        keywords: " Formulario, Solicitud, Credito,Hipotecario",
        custom: {
          property: "Custom Property"
        },
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Formulario de Solicitud de Credito Hipotecario",
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              ...arregloInputs.map((input) => (
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${input.label}: ${formData[input.name] || "N/A"}`,
                      size: 18,
                    }),
                  ],
                })
              )),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Formulario_Sol_Cred_Hipotecario.docx");
      });

      alert("Formulario enviado y Word generado");

    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };


  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 style={{ paddingBlock: "10px" }}>Formulario Solicitud de Credito Personal o Hipotecario</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)} tamano={arregloInputs.length} />
        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <label>{arregloInputs[currentInput].label}</label>
            {arregloInputs[currentInput].type === "select" ? (
              <select
                name={arregloInputs[currentInput].name}
                value={formData[arregloInputs[currentInput].name]}
                onChange={handleInputChange}
                style={{ backgroundColor: "white", color: "black", outline: "none" }}
              >
                <option value="">Seleccione una opción</option>
                {arregloInputs[currentInput].options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={arregloInputs[currentInput].type}
                name={arregloInputs[currentInput].name}
                placeholder={arregloInputs[currentInput].placeholder}
                value={formData[arregloInputs[currentInput].name]}
                onChange={handleInputChange}
              />
            )}


            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 ? (<button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Atrás</button>) : null}
              {currentInput < arregloInputs.length - 1 ? (
                <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Paso siguiente <i className="ri-arrow-right-s-line"></i></button>
              ) : (
                <>
                  <PDFDownloadLink document={<SolicitudCreditoPDF />} fileName="Curriculum_Vitae.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." : <button type="button" style={{ backgroundColor: "tomato" }} onClick={setIsExportingPDF(true)}><i className="ri-save-fill"></i> PDF</button>)}
                  </PDFDownloadLink>
                  <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}><i className="ri-save-fill"></i> Word</button>
                </>
              )}
            </div>
          </form>
          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <SolicitudCreditoPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}


export function SolCredPerHipotComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/Fill-My-Doc/document/content/solCredHip/doc">
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
          <h1>Generador de Solicitud de Credito Personal o Hipotecario</h1>
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
          <Link to="/Fill-My-Doc/document/content/solCredHip/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Solicitud de Crédito Personal o Hipotecario?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>solicitud de crédito personal o hipotecario</strong> es un documento mediante el cual una persona solicita formalmente a una entidad financiera el otorgamiento de un préstamo para necesidades personales o la compra de una propiedad. Este proceso implica el análisis de la capacidad de pago del solicitante y la revisión de documentación para evaluar el riesgo crediticio.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Información clave para la solicitud:
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Datos Personales:</strong> Nombre completo, número de documento de identidad, fecha de nacimiento y estado civil.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Información de Contacto:</strong> Dirección actual, número de teléfono y correo electrónico.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ingresos Mensuales:</strong> Declaración de ingresos provenientes de trabajo o actividades económicas.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Detalles del Préstamo:</strong> Monto solicitado y plazo de pago deseado.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Destino del Crédito:</strong> Propósito del préstamo, ya sea para consumo personal o adquisición de vivienda.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Información Laboral:</strong> Nombre del empleador, ocupación, tiempo en el empleo y tipo de contrato.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Referencias Personales:</strong> Contactos adicionales que puedan validar la información del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Garantías (en caso de crédito hipotecario):</strong> Descripción de la propiedad que será utilizada como garantía.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Historial Crediticio:</strong> Declaración sobre otros créditos actuales y pagos pendientes.
              </li>
            </ul>

            <p style={{ fontSize: "16px", color: "#555" }}>
              Es fundamental completar la solicitud de manera precisa y honesta, ya que las instituciones financieras evalúan rigurosamente cada detalle para tomar una decisión sobre la aprobación del crédito. Para un crédito hipotecario, adicionalmente se deben presentar documentos sobre la propiedad y una tasación oficial.
            </p>
          </div>
        </div>



      </div>
    </div>


  );
}
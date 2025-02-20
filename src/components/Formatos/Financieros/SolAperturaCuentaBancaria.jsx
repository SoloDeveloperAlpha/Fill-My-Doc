import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/formCntaBnc.png";


export default function FormAccountOpening() {
  const arregloInputs = [
    { label: "Nombre Completo", type: "text", name: "nombre", placeholder: "Ej: Juan Pérez" },
    { label: "Número de Documento", type: "text", name: "documento", placeholder: "Ej: 12345678" },
    { label: "Fecha de Nacimiento", type: "date", name: "fechaNacimiento", placeholder: "" },
    { label: "Dirección", type: "text", name: "direccion", placeholder: "Ej: Calle Principal 123" },
    { label: "Ciudad", type: "text", name: "ciudad", placeholder: "Ej: Lima" },
    { label: "Código Postal", type: "text", name: "codigoPostal", placeholder: "Ej: 07112" },
    { label: "Número de Teléfono", type: "text", name: "telefono", placeholder: "Ej: +51998765432" },
    { label: "Correo Electrónico", type: "email", name: "email", placeholder: "Ej: juan.perez@gmail.com" },
    { label: "Tipo de Cuenta", type: "select", name: "tipoCuenta", options: ["Ahorros", "Corriente", "Plazo Fijo"] },
    { label: "Ingresos Mensuales Aproximados", type: "number", name: "ingresos", placeholder: "Ej: 2500" },
    { label: "Ocupación", type: "text", name: "ocupacion", placeholder: "Ej: Ingeniero" }
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    fechaNacimiento: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
    tipoCuenta: "",
    ingresos: "",
    ocupacion: ""
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

  const FormularioPDF = () => {

    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Formulario Solicitud de Apertura de Cuenta Bancaria</Text>
          <View style={{ ...styles.bordeTabla, height: "auto" }}>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Nombre Completo:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData["nombre"] || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Número de Documento:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData["documento"] || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Fecha de Nacimiento:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData["fechaNacimiento"] || "N/A"}</Text>
              </View>
            </View>
            <View style={{ ...styles.filas, height: "20%" }}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Dirección:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData["direccion"] || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Ciudad:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData["ciudad"] || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Código Postal:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData["codigoPostal"] || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.masDeUnaCelda}>
                <Text style={styles.label}>Número de Teléfono:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData["telefono"] || "N/A"}</Text>
              </View>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Correo Electrónico:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData["email"] || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Tipo de Cuenta:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData["tipoCuenta"] || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Ingresos Mensuales Aproximados:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData["ingresos"] || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.filas}>
              <View style={styles.unicaCelda}>
                <Text style={styles.label}>Ocupación:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 10 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData["ocupacion"] || "N/A"}</Text>
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
        title: "Formulario de Solicitud de Apertura de Cuenta Bancaria",
        subject: "Formulario de Solicitud de Apertura de Cuenta Bancaria",
        keywords: "Formulario, Solicitud, Apertura, Cuenta, Bancaria",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                spacing: { after: 300 },
                children: [
                  new TextRun({
                    text: "Formulario Solicitud de Cuenta Bancaria",
                    bold: true,
                    size: 28,
                  }),
                ],
              }),

              // Espacio en blanco para separación
              new Paragraph({ text: "", spacing: { after: 300 } }),

              ...arregloInputs.map((input) =>
                new Paragraph({
                  spacing: { after: 300 },
                  children: [
                    new TextRun({
                      text: `${input.label}: `,
                      bold: true,
                      size: 20,
                    }),
                    new TextRun({
                      text: formData[input.name] || "N/A",
                      size: 18,
                    }),
                  ],
                })
              ),

              // Espacio final
              new Paragraph({ text: "", spacing: { after: 500 } }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Formulario_Solicitud_Cuenta_Bancaria.docx");
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
        <h2 style={{ paddingBlock: "10px" }}>Formulario Solicitud de Apertura de Cuenta Bancaria</h2>
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
                  <PDFDownloadLink document={<FormularioPDF />} fileName="Curriculum_Vitae.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." : <button type="button" style={{ backgroundColor: "tomato" }} onClick={setIsExportingPDF(true)}><i className="ri-save-fill"></i> PDF</button>)}
                  </PDFDownloadLink>
                  <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}><i className="ri-save-fill"></i> Word</button>
                </>
              )}
            </div>
          </form>
          <div className="col2" style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <PDFViewer style={{ height: "100%" }}>
              <FormularioPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}


export function FormAccOpenComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/solAccountOpen/doc">
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
          <h1>Generador de Formulario Solicitud de Apertuta de Cuenta Bancaria</h1>
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
          <Link to="/document/content/solAccountOpen/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es un Formulario de Apertura de Cuenta Bancaria?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Un <strong style={{ color: "#007bff" }}>formulario de apertura de cuenta bancaria</strong> es un documento requerido por las instituciones financieras para recopilar información personal y financiera de un cliente que desea abrir una cuenta bancaria. Este documento garantiza que el banco pueda cumplir con las regulaciones locales y brindar un servicio seguro.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Información requerida en el formulario:
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Nombre Completo:</strong> El nombre legal del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Número de Documento:</strong> Documento Nacional de Identidad (DNI) o número de identificación oficial.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha de Nacimiento:</strong> Información esencial para verificar la identidad del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Dirección:</strong> Domicilio actual del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ciudad y Código Postal:</strong> Datos de localización para correspondencia.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Número de Teléfono:</strong> Para contacto en caso de dudas o confirmación de información.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Correo Electrónico:</strong> Medio digital para comunicaciones.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Tipo de Cuenta:</strong> Indicación del tipo de cuenta bancaria que desea abrir (ahorros, corriente, etc.).
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ingresos Mensuales Aproximados:</strong> Información financiera del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ocupación:</strong> Profesión o actividad laboral del solicitante.
              </li>
            </ul>

            <p style={{ fontSize: "16px", color: "#555" }}>
              Completar este formulario de manera clara y precisa es fundamental para que el banco procese la solicitud y brinde los servicios adecuados. Además, garantiza el cumplimiento de las regulaciones sobre identificación y seguridad financiera.
            </p>
          </div>
        </div>

      </div>
    </div>


  );
}
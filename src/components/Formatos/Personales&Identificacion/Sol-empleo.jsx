import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import contrato from "../../../assets/solempleo.png";
import { Link } from 'react-router-dom';

export default function SolEmpleo() {

  const arregloInputs = [
    { label: "Tipo de puesto buscado", type: "checkbox", name: "puesto", options: ["Full-Time", "Part-Time", "Estacional"] },
    { label: "Ingrese su Nombre", type: "text", name: "nombre", placeholder: "Ej: Arturo" },
    { label: "Ingrese su Apellido", type: "text", name: "apellido", placeholder: "Ej: Vasquez" },
    { label: "Dirección", type: "text", name: "direccion", placeholder: "Ej: Calle Letanias 334" },
    { label: "Ciudad", type: "text", name: "ciudad", placeholder: "Ej: Lima" },
    { label: "Código Postal", type: "text", name: "codigopostal", placeholder: "Ej: 07112" },
    { label: "Provincia", type: "text", name: "provincia", placeholder: "Ej: Callao" },
    { label: "Numero de Teléfono", type: "text", name: "telefono", placeholder: "Ej: +51998756425" },
    { label: "Direccion E-mail", type: "email", name: "email", placeholder: "Ej: art_vasq@gmail.com" },
    { label: "Posicion Codiciada", type: "text", name: "posdeseado", placeholder: "Ej: Operario" },
    { label: "Disponibilidad", type: "checkbox", name: "turno", options: ["Dia", "Tarde", "Noche", "Fin de Semana"] },
    { label: "Numero de Horas Deseado", type: "text", name: "horas", placeholder: "Ej: 8h" },
    { label: "Disponibilidad de:", type: "text", name: "diasdisponible", placeholder: "Ej: Lunes a Viernes" },
    { label: "Expectativas Salariales", type: "text", name: "salariodeseado", placeholder: "Ej: 2500 soles" },
    { label: "¿Tienes mas de 18 años?", type: "checkbox", name: "verfedad", options: ["Si", "NO"] }

  ];

  const [formData, setFormData] = useState({
    puesto: [],
    nombre: "",
    apellido: "",
    direccion: "",
    ciudad: "",
    codigopostal: "",
    provincia: "",
    telefono: "",
    email: "",
    posdeseado: "",
    turno: [],
    horas: "",
    diasdisponible: "",
    salariodeseado: "",
    verfedad: []
  });

  const [currentInput, setCurrentInput] = useState(0);
  const [selectedPuesto, setSelectedPuesto] = useState(["N/A"]);  // Estado para 'puesto'
  const [selectedTurno, setSelectedTurno] = useState(["N/A"]);    // Estado para 'turno'
  const [selectedVerfedad, setSelectedVerfedad] = useState(["N/A"]);  // Estado para 'verfedad'
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const handleCheckboxChange = (option, group) => {
    switch (group) {
      case 'puesto':
        setSelectedPuesto(prevState =>
          prevState.includes(option)
            ? prevState.filter(item => item !== option)
            : [option]
        );
        break;
      case 'turno':
        setSelectedTurno(prevState =>
          prevState.includes(option)
            ? prevState.filter(item => item !== option)
            : [option]
        );
        break;
      case 'verfedad':
        setSelectedVerfedad(prevState =>
          prevState.includes(option)
            ? prevState.filter(item => item !== option)
            : [option]
        );
        break;
      default:
        break;
    }
  };


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
    alert("Formulario enviado");
  };
  const FormularioPDF = () => {
    const sectionStyle = { display: "flex", flexDirection: "row", gap: "10em", padding: 1 };
    const sectionColumnStyle = { display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid gray" };
    const sectionHalfStyle = { ...sectionStyle, borderRight: "1px solid gray", width: "50%" };
    const sectionFullStyle = { ...sectionStyle, width: "100%" };

    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Formulario de Solicitud de Empleo</Text>
          <View style={{ width: "100%", border: "1px solid gray" }}>
            <View style={[sectionColumnStyle, { height: "5%" }]}>
              <View style={sectionFullStyle}>
                <Text style={styles.label}>{arregloInputs[0].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{selectedPuesto || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "10%" }]}>
              <View style={sectionHalfStyle}>
                <Text style={styles.label}>{arregloInputs[1].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData["nombre"] || "N/A"}</Text>
              </View>
              <View style={sectionHalfStyle}>
                <Text style={styles.label}>{arregloInputs[2].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData["apellido"] || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "10%" }]}>
              <View style={[sectionStyle, { width: "60%", borderRight: "1px solid gray" }]}>
                <Text style={styles.label}>{arregloInputs[3].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData["direccion"] || "N/A"}</Text>
              </View>
              <View style={[sectionStyle, { width: "40%" }]}>
                <Text style={styles.label}>{arregloInputs[4].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData["ciudad"] || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "10%" }]}>
              <View style={[sectionHalfStyle, { width: "30%" }]}>
                <Text style={styles.label}>{arregloInputs[5].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData["codigopostal"] || "N/A"}</Text>
              </View>
              <View style={[sectionHalfStyle, { width: "30%" }]}>
                <Text style={styles.label}>{arregloInputs[6].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData["provincia"] || "N/A"}</Text>
              </View>
              <View style={[sectionStyle, { width: "40%" }]}>
                <Text style={styles.label}>{arregloInputs[7].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData["telefono"] || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "5%" }]}>
              <View style={sectionFullStyle}>
                <Text style={styles.label}>{arregloInputs[8].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData["email"] || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "5%" }]}>
              <View style={sectionFullStyle}>
                <Text style={styles.label}>{arregloInputs[9].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData["posdeseado"] || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "5%" }]}>
              <View style={sectionFullStyle}>
                <Text style={styles.label}>{arregloInputs[10].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{selectedTurno || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "5%" }]}>
              <View style={[sectionStyle, { width: "60%", borderRight: "1px solid gray" }]}>
                <Text style={styles.label}>{arregloInputs[11].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 11 ? "yellow" : "transparent" }}>{formData["horas"] || "N/A"} horas/semana</Text>
              </View>
              <View style={[sectionStyle, { width: "40%" }]}>
                <Text style={styles.label}>{arregloInputs[12].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 12 ? "yellow" : "transparent" }}>{formData["diasdisponible"] || "N/A"}</Text>
              </View>
            </View>
            <View style={[sectionColumnStyle, { height: "5%" }]}>
              <View style={[sectionStyle, { width: "60%", borderRight: "1px solid gray" }]}>
                <Text style={styles.label}>{arregloInputs[13].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 13 ? "yellow" : "transparent" }}>{formData["salariodeseado"] || "N/A"}</Text>
              </View>
              <View style={[sectionStyle, { width: "40%" }]}>
                <Text style={styles.label}>{arregloInputs[14].label}:</Text>
                <Text style={{ ...styles.label, backgroundColor: currentInput === 14 && isExportingPDF === false ? "yellow" : "transparent" }}>{selectedVerfedad || "N/A"}</Text>
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
      padding: 5, fontSize: 10, fontWeight: 'bold'
    }
  });



  const handleWord = (e) => {
    e.preventDefault();

    try {
      const doc = new Doc({
        creator: "Mi Aplicación",
        title: "Formato de Solicitud de Empleo",
        subject: "Formato de Solicitud de Empleo",
        keywords: "Formato,Solicitud,Empleo,Trabajo",
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
                    text: "Formato de Solicitud de Empleo",
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
        saveAs(blob, "ContratoArrendamiento.docx");
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
        <h2 style={{ paddingBlock: "10px" }}>Formulario de Solicitud de Empleo</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)} tamano={arregloInputs.length} />
        <div className="columnas">
          <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            {arregloInputs[currentInput].type === "text" && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                  {arregloInputs[currentInput].label}
                </label>
                <input
                  type="text"
                  name={arregloInputs[currentInput].name}
                  placeholder={arregloInputs[currentInput].placeholder}
                  value={formData[arregloInputs[currentInput].name]}
                  onChange={handleInputChange}
                  style={{ width: "100%", height: "2em", textIndent: "10px", border: "1px solid gray", outline: "none" }}
                />
              </div>
            )}

            {(arregloInputs[currentInput].type === "checkbox" && arregloInputs[currentInput].name === "puesto") && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>{arregloInputs[currentInput].label}</label>
                {["Full-Time", "Part-Time", "Estacional"].map((option, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="checkbox"
                      checked={selectedPuesto.includes(option)}
                      onChange={() => handleCheckboxChange(option, 'puesto')}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {(arregloInputs[currentInput].type === "checkbox" && arregloInputs[currentInput].name === "turno") && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>{arregloInputs[currentInput].label}</label>
                {["Dia", "Tarde", "Noche", "Fin de Semana"].map((option, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="checkbox"
                      checked={selectedTurno.includes(option)}
                      onChange={() => handleCheckboxChange(option, 'turno')}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {(arregloInputs[currentInput].type === "checkbox" && arregloInputs[currentInput].name === "verfedad") && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>{arregloInputs[currentInput].label}</label>
                {["Si", "No"].map((option, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="checkbox"
                      checked={selectedVerfedad.includes(option)}
                      onChange={() => handleCheckboxChange(option, 'verfedad')}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {arregloInputs[currentInput].type === "email" && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="block mb-2 font-semibold">
                  {arregloInputs[currentInput].label}
                </label>
                <input
                  type="email"
                  name={arregloInputs[currentInput].name}
                  placeholder={arregloInputs[currentInput].placeholder}
                  value={formData[arregloInputs[currentInput].name]}
                  onChange={handleInputChange}
                  style={{ width: "100%", height: "2em", textIndent: "10px", border: "1px solid gray", outline: "none" }}
                />
              </div>
            )}
            <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {currentInput > 0 ? (<button type="button" onClick={handleBack} style={{ backgroundColor: "gray", color: "whitesmoke", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Atrás</button>) : null}
              {currentInput < arregloInputs.length - 1 ? (
                <button type="button" onClick={handleNext} style={{ backgroundColor: "var(--ColorBg3)", color: "white", fontWeight: "bold", fontSize: ".8em", outline: "none" }}>Paso siguiente <i className="ri-arrow-right-s-line"></i></button>
              ) : (
                <>
                  <PDFDownloadLink document={<FormularioPDF />} fileName="FormulariodeSolicituddeEmpleo.pdf">
                    {({ loading }) => (loading ? "Generando PDF..." : <button type="button" onClick={setIsExportingPDF(true)} style={{ backgroundColor: "tomato" }}><i className="ri-save-fill"></i> PDF</button>)}
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

export function SolsEmpleoComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/solempleo/doc">
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
          <h1>Generador de Solicitud de Empleo</h1>
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
          <Link to="/document/content/solempleo/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "#333", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Solicitud de Empleo?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#28a745" }}>solicitud de empleo</strong> es un documento formal que presenta un candidato a una empresa o institución para postularse a un puesto de trabajo. Su función es expresar interés por la vacante, detallar tus cualificaciones y motivaciones, y destacar por qué eres un buen candidato.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Qué información debe contener?
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Tipo de puesto buscado:</strong> Selección del tipo de puesto que deseas, como Full-Time, Part-Time o Estacional.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ingrese su Nombre:</strong> Campo para escribir tu nombre, por ejemplo, Arturo.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ingrese su Apellido:</strong> Campo para escribir tu apellido, por ejemplo, Vasquez.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Dirección:</strong> Espacio para proporcionar tu dirección completa, como "Calle Letanias 334".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Ciudad:</strong> Indica la ciudad donde resides, por ejemplo, Lima.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Código Postal:</strong> Número que identifica tu zona postal, como 07112.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Provincia:</strong> Nombre de la provincia donde resides, como Callao.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Número de Teléfono:</strong> Campo para ingresar tu número de contacto, como +51998756425.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Dirección E-mail:</strong> Campo para escribir tu correo electrónico, como art_vasq@gmail.com.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Posición Codiciada:</strong> Puesto específico al que deseas postular, por ejemplo, Operario.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Disponibilidad:</strong> Opciones para seleccionar tu disponibilidad laboral, como Día, Tarde, Noche o Fin de Semana.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Número de Horas Deseado:</strong> Campo para ingresar cuántas horas deseas trabajar, por ejemplo, "8h".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Disponibilidad de:</strong> Días de la semana en los que estás disponible para trabajar, como "Lunes a Viernes".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Expectativas Salariales:</strong> Campo para indicar el salario que esperas recibir, por ejemplo, "2500 soles".
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>¿Tienes más de 18 años?:</strong> Selección para indicar si eres mayor de edad, con opciones "Sí" o "No".
              </li>
            </ul>


            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              La solicitud de empleo debe ser clara y bien estructurada. Asegúrate de personalizarla para cada oferta laboral, resaltando tus fortalezas y adaptándola a los requisitos específicos del puesto.
            </p>
          </div>


        </div>
      </div>
    </div>


  );
}
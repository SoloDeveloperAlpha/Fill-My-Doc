import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from "../../Loadings/ProgressBar.jsx";
import contrato from "../../../assets/renov.png";
import { Link } from "react-router-dom";

export default function RenovacionDNIoPassP() {
  const [currentInput, setCurrentInput] = useState(0);
  const [cargaFoto, setCargaFoto] = useState("");
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [showhid, setShowhid] = useState(false);
  const dataContenido = [
    { label: "Nombre Completo:", type: "text", name: "nombrecompleto", placeholder: ["Primer Nombre", "Segundo Nombre", "Apellido Paterno", "Apellido Materno"] },
    { label: "Fecha de Nacimiento:", type: "date", name: "fec_nac" },
    { label: "Nacionalidad:", type: "text", name: "nacionalidad", placeholder: "Ingrese se Nacionalidad u Origen" },
    { label: "DNI / Pasaporte:", type: "text", name: "documentoIdentidad", placeholder: "Num. DNI / Pasaporte" },
    { label: "Sexo:", type: "checkbox", name: "sexo", options: ["Maculino", "Femenino", "Otro"] },
    { label: "Estado civil:", type: "checkbox", name: "civilstate", options: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "Otro"] },
    { label: "Dirección Completa:", type: "text", name: "dir_completa", placeholder: ["Calle", "Numero", "Piso", "Ciudad", "Departamento", "Codigo Postal"] },
    { label: "Telefono de Contacto:", type: "text", name: "num_telf", placeholder: "Ingrese su numero de Telefono" },
    { label: "Correo Electrónico:", type: "email", name: "email", placeholder: "Ingrese su Email" },
    { label: "Tipo de Documento a Renovar:", type: "checkbox", name: "docType", options: ["DNI", "Pasaporte"] },
    { label: "Motivo de Renovación:", type: "checkbox", name: "motivoRenov", options: ["Vencimiento", "Perdida", "Robo", "Daño", "Cambio de Datos"] },
    { label: "Fecha de Emision del Documento Actual:", type: "date", name: "fec_emision" },
    { label: "Fotografia Actualizada:", type: "checkbox", name: "fotografia", options: ["Sí (Adjuntar foto reciente)", "No (Por favor, incluya fotografía en el momento de la solicitud)"] },
    { label: "Firma:", type: "text", name: "firma", placeholder: "Firma del Solicitante" }
  ];

  const [formData, setFormData] = useState({
    nombrecompleto: { PrimerNombre: "", SegundoNombre: "", ApellidoPaterno: "", ApellidoMaterno: "" },
    fec_nac: "",
    sexo: [],
    nacionalidad: "",
    documentoIdentidad: "",
    civilstate: [],
    dir_completa: { calle: "", numero: "", piso: "", ciudad: "", departamento: "", codigoPostal: "" },
    num_telf: "",
    email: "",
    docType: [],
    motivoRenov: [],
    fec_emision: "",
    fotografia: [],
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

  const RenovationLetterPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Formulario de Renovacion de DNI/Pasaporte</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>1. Datos Personales: </Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.text}>• Primer Nombre: <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombrecompleto[0] || "______"}</Text> </Text>
            <Text style={styles.text}>• Segundo Nombre: <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombrecompleto[1] || "______"}</Text> </Text>
            <Text style={styles.text}>• Apellido Paterno: <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombrecompleto[2] || "______"}</Text> </Text>
            <Text style={styles.text}>• Apellido Materno: <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombrecompleto[3] || "______"}</Text> </Text>
          </View>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>2. Fecha de Nacimiento: <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.fec_nac || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>3. Nacionalidad: <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.nacionalidad || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>4. Numero de Documento Actual ( DNI/Pasaporte): <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.documentoIdentidad || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>5. Sexo: <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.sexo}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>6. Estado Civil: <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.civilstate}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>7. Dirección de Residencia: </Text>
          <Text style={styles.text}>• Calle: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dir_completa[0] || "______"}</Text> </Text>
          <Text style={styles.text}>• Número: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dir_completa[1] || "______"}</Text> </Text>
          <Text style={styles.text}>• Piso: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dir_completa[2] || "______"}</Text> </Text>
          <Text style={styles.text}>• Ciudad: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dir_completa[3] || "______"}</Text> </Text>
          <Text style={styles.text}>• Departamento: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dir_completa[4] || "______"}</Text> </Text>
          <Text style={styles.text}>• Código Postal: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.dir_completa[5] || "______"}</Text> </Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>8. Telefono de Contacto: <Text style={{ backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.num_telf || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>9: Correo Electronico:<Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.email || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>10: Tipo de Documento a Renovar:<Text style={{ backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.docType || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>11: Motivo de Renovación:<Text style={{ backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{formData.motivoRenov || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>12: Fecha de Emision:<Text style={{ backgroundColor: currentInput === 11 ? "yellow" : "transparent" }}>{formData.fec_emision || "______"}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>13: Fotografia:<Text style={{ backgroundColor: currentInput === 12 ? "yellow" : "transparent" }}>{formData.fotografia || "______"} - {cargaFoto}</Text></Text>
        </View>
        <View style={{ ...styles.section, borderBottom: "1px solid gray" }}>
          <Text style={styles.text}>14: Firma:<Text style={{ backgroundColor: currentInput === 13 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.firma || "______"}</Text></Text>
        </View>
      </Page>
    </Document >
  );

  const styles = StyleSheet.create({
    page: {
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", padding: 40, fontSize: 12, lineHeight: 1.5
    },
    section: { marginBottom: 10, width: "100%" },
    title: { fontSize: 18, marginBottom: 10, textAlign: "center", textDecoration: "underline" },
    text: { fontSize: 10, marginBottom: 5 }
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
        <h2 className="text-xl font-bold mb-4">Generador de Solicitud Renovacion DNI/Pasaporte</h2>
        <ProgressBar percent={Math.round((100 * (currentInput + 1)) / dataContenido.length)} tamano={dataContenido.length} />
        <div className="columnas">
          <div className="modelo" style={{ display: showhid ? "flex" : "none" }}>
            <i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i>
            <img src={contrato} alt="Acuerdo de Confidencialidad" />
          </div>
          <form
            className="col1"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1em" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {dataContenido[currentInput].type === "checkbox" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>{dataContenido[currentInput].label}<i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i></label>
                  {dataContenido[currentInput].options.map((option, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData[dataContenido[currentInput].name].includes(option)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const updatedState = e.target.checked
                            ? [...formData[dataContenido[currentInput].name], value]  // Agrega el valor si está marcado
                            : formData[dataContenido[currentInput].name].filter(item => item !== value);  // Elimina el valor si está desmarcado
                          setFormData((prevData) => ({
                            ...prevData,
                            [dataContenido[currentInput].name]: updatedState,
                          }));
                        }}

                      />{" "}
                      {option}
                      {(dataContenido[currentInput].name === "fotografia" && option === "Sí (Adjuntar foto reciente)") ? (<div><input type="file" name="cargar" id="cargar" onChange={(e) => setCargaFoto(e.target.files[0]?.name)} /></div>) : (<div></div>)}
                    </label>
                  ))}
                </div>
              )}

              {dataContenido[currentInput].type === "date" && (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "1em" }}>
                  <label>{dataContenido[currentInput].label}<i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i></label>
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: "1em",
                      width: "100%",
                    }}
                  >
                    Seleccione fecha:
                    <input
                      type="date"
                      name={dataContenido[currentInput].name}
                      value={formData[dataContenido[currentInput].name] || ""}
                      onChange={handleInputChange}
                      style={{ width: "55%" }}
                    />
                  </label>
                </div>
              )}

              {dataContenido[currentInput].type === "text" && Array.isArray(dataContenido[currentInput].placeholder) ? (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "1em" }}>
                  <label>{dataContenido[currentInput].label}<i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i></label>
                  {dataContenido[currentInput].placeholder.map((holders, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: "1em",
                        width: "100%",
                      }}
                    >
                      {holders}:
                      <input
                        type="text"
                        name={`${dataContenido[currentInput].name}_${index}`}
                        value={formData[dataContenido[currentInput].name][index] || ""}
                        onChange={(e) => {
                          const updatedValue = { ...formData[dataContenido[currentInput].name] };  // Copia del objeto
                          updatedValue[index] = e.target.value;  // Actualiza el campo específico
                          setFormData((prevData) => ({
                            ...prevData,
                            [dataContenido[currentInput].name]: updatedValue,  // Actualiza la propiedad en formData
                          }));
                        }}

                        style={{ width: "55%" }}
                      />
                    </label>
                  ))}
                </div>
              ) : (
                (dataContenido[currentInput].type === "text" || dataContenido[currentInput].type === "email") && (
                  <div>
                    <label>{dataContenido[currentInput].label}<i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i></label>
                    <input
                      type="text"
                      name={dataContenido[currentInput].name}
                      value={formData[dataContenido[currentInput].name] || ""}
                      onChange={handleInputChange}
                      style={{ width: "100%" }}
                    />
                  </div>
                ))}

              <div className="botones" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                {currentInput > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    style={{
                      backgroundColor: "gray",
                      color: "whitesmoke",
                      fontWeight: "bold",
                      fontSize: ".8em",
                      outline: "none",
                    }}
                  >
                    Atrás
                  </button>
                )}
                {currentInput < dataContenido.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    style={{
                      backgroundColor: "var(--ColorBg3)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: ".8em",
                      outline: "none",
                    }}
                  >
                    Paso siguiente <i className="ri-arrow-right-s-line"></i>
                  </button>
                ) : (
                  <>
                    <PDFDownloadLink
                      document={<RenovationLetterPDF />}
                      fileName="RenovacionDNIoPasaporte.pdf"
                    >
                      {({ loading }) =>
                        loading ? "Generando PDF..." : (
                          <button
                            type="button"
                            style={{ backgroundColor: "tomato" }}
                            onClick={setIsExportingPDF(true)}
                          >
                            <i className="ri-save-fill"></i> PDF
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                    <button
                      onClick={generateWordDocument}
                      style={{ backgroundColor: "var(--ColorFont1)" }}
                    >
                      <i className="ri-save-fill"></i> Word
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>

          <div className="col2">
            <PDFViewer style={{ height: "100%" }}>
              <RenovationLetterPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
};


export function RenovDNIPassComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/document/content/renovDNIPassP/doc">
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
          <h1>Generador de Solicitud Renovacion DNI/Pasaporte</h1>
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
          <Link to="/document/content/renovDNIPassP/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "#333", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Solicitud de Renovación de DNI o Pasaporte?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>Solicitud de Renovación de DNI o Pasaporte</strong> es un trámite formal mediante el cual una persona solicita la extensión de la validez de su Documento Nacional de Identidad (DNI) o Pasaporte. Este proceso es fundamental para mantener la vigencia de estos documentos oficiales que acreditan la identidad y permiten realizar viajes internacionales.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Qué información debe contener?
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Nombre Completo:</strong> Indicar primer nombre, segundo nombre (opcional), apellido paterno y materno.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha de Nacimiento:</strong> Seleccionar la fecha de nacimiento del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Nacionalidad:</strong> Especificar la nacionalidad u origen del solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>DNI / Pasaporte:</strong> Número del documento de identidad o pasaporte a renovar.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Sexo:</strong> Seleccionar entre las opciones disponibles: Masculino, Femenino u Otro.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Estado Civil:</strong> Seleccionar el estado civil del solicitante (Soltero/a, Casado/a, etc.).
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Dirección Completa:</strong> Incluir calle, número, piso, ciudad, departamento y código postal.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Teléfono de Contacto:</strong> Número telefónico válido para comunicarse con el solicitante.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Correo Electrónico:</strong> Dirección de correo válida para notificaciones.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Tipo de Documento a Renovar:</strong> Especificar si se desea renovar el DNI o Pasaporte.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Motivo de Renovación:</strong> Indicar la razón para la renovación (Vencimiento, Pérdida, Robo, Daño, Cambio de Datos).
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha de Emisión del Documento Actual:</strong> Seleccionar la fecha de emisión del documento que se desea renovar.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fotografía Actualizada:</strong> Indicar si se cuenta con una fotografía reciente o se adjuntará en el momento de la solicitud.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Firma:</strong> Espacio para la firma del solicitante.
              </li>
            </ul>


            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Es importante verificar los requisitos específicos del país o entidad emisora antes de presentar la solicitud, ya que estos pueden variar. Un trámite bien preparado ayuda a evitar retrasos y asegurar la recepción oportuna del documento renovado.
            </p>
          </div>
        </div>

      </div>
    </div>


  );
}
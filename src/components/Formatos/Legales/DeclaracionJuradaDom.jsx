import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import { Link } from 'react-router-dom';
import contrato from "../../../assets/declarJurDom.png";

export default function DeclaracionJuradaDom() {

  const departamentosPeru = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
    "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
    "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura",
    "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];

  const arregloInputs = [
    { label: "Nombre Completo", type: "text", name: "nombreCompleto", placeholder: "Ej. Juan Pérez" },
    { label: "Número de Documento de Identidad", type: "text", name: "documentoIdentidad", placeholder: "Ej. 12345678" },
    { label: "Domicilio Actual", type: "text", name: "domicilioActual", placeholder: "Ej. Av. Los Pinos 456, Lima" },
    { label: "Departamento", type: "select", name: "departamento", options: departamentosPeru },
    { label: "Provincia", type: "text", name: "provincia", placeholder: "Ej. Lima" },
    { label: "Distrito", type: "text", name: "distrito", placeholder: "Ej. Miraflores" },
    { label: "Teléfono de Contacto", type: "tel", name: "telefono", placeholder: "Ej. 987654321" },
    { label: "Correo Electrónico", type: "email", name: "correo", placeholder: "Ej. correo@example.com" },
    { label: "Notario o Institución Receptora", type: "text", name: "institucion", placeholder: "Ej. Notaría Pérez o SUNARP" },
    { label: "Tipo de Poder", type: "select", name: "tipoPoder", options: ["General", "Especial", "Judicial"] },
    { label: "Autorizo Representación Legal", type: "checkbox", name: "autorizoRepresentacion" },
    { label: "Observaciones", type: "text", name: "observaciones", placeholder: "Información adicional (opcional)" }
  ];


  const [formData, setFormData] = useState({
    nombreCompleto: "",
    documentoIdentidad: "",
    domicilioActual: "",
    departamento: "",
    provincia: "",
    distrito: "",
    telefono: "",
    correo: "",
    institucion: "",
    tipoPoder: "",
    autorizoRepresentacion: false,
    observaciones: ""
  });


  const [currentInput, setCurrentInput] = useState(0);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [checado, setChecado] = useState(false);
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
        title: "Declaración Jurada de Domicilio",
        subject: "Declaración Jurada de Domicilio",
        keywords: "Declaración, Jurada, Domicilio",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                spacing: 500,
                children: [
                  new TextRun({
                    text: "DECLARACIÓN JURADA DE DOMICILIO",
                    bold: true,
                    size: 32,
                    allCaps: true
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Yo, ${formData.nombreCompleto || "_____"}, identificado(a) con documento de identidad número ${formData.documentoIdentidad || "_____"}, domiciliado(a) en ${formData.domicilioFiscal || "_____"}, declaro bajo juramento que el domicilio indicado es mi residencia habitual y el lugar donde desarrollo mis actividades personales y/o laborales.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Manifiesto bajo juramento lo siguiente:", bold: true, size: 24 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "1. Mi domicilio actual es:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.domicilioFiscal || "_____"}.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "2. El tiempo de permanencia en este domicilio es de:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.tiempoDomicilio || "_____"}.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "3. Mi domicilio anterior fue:", bold: true, size: 24 }),
                  new TextRun({ text: ` ${formData.domicilioAnterior || "_____"}.`, size: 24 })
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "4. Declaro que la información proporcionada es verídica y podrá ser verificada por las autoridades correspondientes.", size: 24 }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Realizada a fecha ${new Date().toLocaleDateString()}.`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Observaciones: ${formData.observaciones || "Ninguna"}`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "______________________________",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.nombreCompleto || "Firma del Declarante",
                    size: 24,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "DeclaracionJuradaDomicilio.docx");
      });

      alert("Formulario enviado y Word generado");
    } catch (error) {
      console.error("Error al generar el archivo Word:", error);
      alert("Hubo un problema al generar el archivo Word. Revisa la consola.");
    }
  };

  const DeclarationPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>DECLARACIÓN JURADA DE DOMICILIO</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Yo, <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombreCompleto || "_____"}</Text>,
            identificado(a) con documento de identidad número <Text style={{ backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData.documentoIdentidad || "_____"}</Text>,
            domiciliado(a) en <Text style={{ backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData.domicilioActual || "_____"}</Text>,
            del departamento de <Text style={{ backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData.departamento || "_____"}</Text>,
            en la provincia de <Text style={{ backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData.provincia || "_____"}</Text>,
            distrito <Text style={{ backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData.distrito || "_____"}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Teléfono de contacto: <Text style={{ backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData.telefono || "_____"}</Text>
          </Text>
          <Text style={styles.text}>
            Correo electrónico: <Text style={{ backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData.correo || "_____"}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Notario o Institución Receptora: <Text style={{ backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData.institucion || "_____"}</Text>
          </Text>
          <Text style={styles.text}>
            Tipo de Poder: <Text style={{ backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData.tipoPoder || "_____"}</Text>
          </Text>
          <Text style={styles.text}>
            Autorizo Representación Legal: <Text style={{ backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{formData.autorizoRepresentacion ? "Sí" : "No"}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Observaciones:</Text>
            <Text style={{ backgroundColor: currentInput === 11 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData.observaciones || "Ninguna"}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Declaro que la información proporcionada es verdadera y que me hago responsable de su veracidad.</Text>
          <Text style={styles.text}>Comprendo que cualquier falsedad en esta declaración puede derivar en sanciones legales según la normativa vigente.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Realizada a fecha {new Date().toLocaleDateString()}.</Text>
        </View>

        <View style={styles.firmaContainer}>
          <Text style={styles.text}>______________________________</Text>
          <Text style={styles.text}>
            <Text style={{ backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData.nombreCompleto || "Firma del Declarante"}</Text>
          </Text>
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
    unicaCelda: { flex: 1, display: "flex", flexDirection: "row", padding: 1 },
    masDeUnaCelda: { flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-start", borderRight: "1px solid gray" },
    filaGruesa: {
      display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid gray", height: "15%"
    }


  });

  return (
    <div className="ModelContainer">
      <div className="contenedor_form">
        <h2 style={{ paddingBlock: "10px" }}>Formulario de Declaración Jurada de Domicilio</h2>
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

            {arregloInputs[currentInput].type === "select" ? (
              <select
                name={arregloInputs[currentInput].name}
                value={formData[arregloInputs[currentInput].name] || ""}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                {arregloInputs[currentInput].options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : arregloInputs[currentInput].type === "checkbox" ? (
              <>
                <div className="chec" style={{ width: "100%", display: "flex" }}>
                  <input
                    type="checkbox"
                    name={arregloInputs[currentInput].name}
                    checked={formData[arregloInputs[currentInput].name] || false}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [arregloInputs[currentInput].name]: e.target.checked,
                      });
                      setChecado(!checado);
                    }
                    }
                  /> <label>{checado === false ? "No" : "Si"}</label>
                </div>
              </>
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
                  <PDFDownloadLink document={<DeclarationPDF />} fileName="Declaracion_Domicilio.pdf">
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
              <DeclarationPDF />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );


}


export function DeclarJuradDomComponent() {
  return (
    <div className="container">
      <div className="col1">
        <Link to="/Fill-My-Doc/document/content/declarJurDom/doc">
          <img src={contrato} alt="" />
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
        </div>
      </div>
      <div className="col2">
        <div className="titulo">
          <h1>Generador de Declaración Jurada de Domicilio</h1>
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
          <Link to="/Fill-My-Doc/document/content/declarJurDom/doc" id='rellenar'>Rellenar el modelo</Link>
        </div>
        <div className="explain">
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
            <h1 style={{ fontSize: "24px", color: "var(--ColorFont1)", textAlign: "center", paddingBlock: "1em" }}>
              ¿Qué es una Declaración Jurada de Domicilio?
            </h1>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              Una <strong style={{ color: "#007bff" }}>Declaración Jurada de Domicilio</strong> es un documento en el cual una persona afirma bajo juramento su lugar de residencia actual. Este documento suele ser requerido por entidades bancarias, instituciones gubernamentales y otras organizaciones para verificar la dirección de una persona.
            </p>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              ¿Por qué es importante?
            </h2>

            <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
              La Declaración Jurada de Domicilio es fundamental porque:
            </p>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Requisito legal:</strong> Puede ser necesaria para trámites administrativos y legales.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Acreditación de residencia:</strong> Sirve como prueba de domicilio ante entidades que lo soliciten.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Evita fraudes:</strong> Permite verificar la información de una persona y prevenir actividades ilícitas.
              </li>
            </ul>

            <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
              Campos importantes en la Declaración Jurada de Domicilio
            </h2>

            <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Datos del declarante:</strong> Nombre completo, número de identificación (DNI, pasaporte, etc.).
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Dirección exacta:</strong> Calle, número, distrito, ciudad y código postal donde reside.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Fecha de emisión:</strong> Es importante para la validez del documento.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Firma y juramento:</strong> La persona debe firmar asegurando que la información es verídica, bajo responsabilidad legal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, AlignmentType, Doc, Packer, Paragraph, TextRun, saveAs } from '../../../utils/utilImport.js';
import ProgressBar from '../../Loadings/ProgressBar.jsx';
import contrato from "../../../assets/curriculum.png";
import { Link } from "react-router-dom";

export default function FormCV() {
    const [showhid, setShowhid] = useState(false);
    const arregloInputs = [
        { label: "Nombre Completo", type: "text", name: "nombre", placeholder: "Ej: Arturo Vasquez" },
        { label: "Dirección", type: "text", name: "direccion", placeholder: "Ej: Calle Letanias 334" },
        { label: "Ciudad", type: "text", name: "ciudad", placeholder: "Ej: Lima" },
        { label: "Código Postal", type: "text", name: "codigopostal", placeholder: "Ej: 07112" },
        { label: "Provincia", type: "text", name: "provincia", placeholder: "Ej: Callao" },
        { label: "Número de Teléfono", type: "text", name: "telefono", placeholder: "Ej: +51998756425" },
        { label: "Dirección E-mail", type: "email", name: "email", placeholder: "Ej: art_vasq@gmail.com" },
        { label: "Posición deseada", type: "text", name: "posdeseado", placeholder: "Ej: Desarrollador Front-End" },
        { label: "Formación Académica", type: "text", name: "formacion", placeholder: "Ej: Ingeniería de Sistemas" },
        { label: "Experiencia Profesional", type: "text", name: "experiencia", placeholder: "Ej: 3 años en desarrollo web" },
        { label: "Habilidades", type: "text", name: "habilidades", placeholder: "Ej: JavaScript, React, Node.js" },
        { label: "Idiomas", type: "text", name: "idiomas", placeholder: "Ej: Inglés, Español" },
        { label: "Referencias", type: "text", name: "referencias", placeholder: "Ej: Referencia laboral de Juan Pérez" }
    ];

    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        ciudad: "",
        codigopostal: "",
        provincia: "",
        telefono: "",
        email: "",
        posdeseado: "",
        formacion: "",
        experiencia: "",
        habilidades: "",
        idiomas: "",
        referencias: ""
    });

    const [currentInput, setCurrentInput] = useState(0);
    const [selectedNivel, setSelectedNivel] = useState(null);
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const handleCheckboxChange = (e) => {
        setSelectedNivel(e.target.value);
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

        return (
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.title}>Formulario Curriculum Vitae</Text>
                    <View style={styles.bordeTabla}>
                        <View style={styles.filas}>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Nombre Completo:</Text>
                                <Text style={{ ...styles.label, overflow: "hidden", backgroundColor: currentInput === 0 ? "yellow" : "transparent" }}>{formData["nombre"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filaGruesa}>
                            <View style={styles.masDeUnaCelda}>
                                <Text style={{ ...styles.label, width: "30%" }}>Dirección:</Text>
                                <Text style={{ ...styles.label, width: "70%", height: "100%", overflow: "hidden", backgroundColor: currentInput === 1 ? "yellow" : "transparent" }}>{formData["direccion"] || "N/A"}</Text>
                            </View>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Ciudad:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 2 ? "yellow" : "transparent" }}>{formData["ciudad"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filas}>
                            <View style={styles.masDeUnaCelda}>
                                <Text style={styles.label}>Código Postal:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 3 ? "yellow" : "transparent" }}>{formData["codigopostal"] || "N/A"}</Text>
                            </View>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Provincia:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 4 ? "yellow" : "transparent" }}>{formData["provincia"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filas}>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Número de Teléfono:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 5 ? "yellow" : "transparent" }}>{formData["telefono"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filas}>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Dirección E-mail:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 6 ? "yellow" : "transparent" }}>{formData["email"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filas}>
                            <View style={styles.masDeUnaCelda}>
                                <Text style={styles.label}>Posición Deseada:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 7 ? "yellow" : "transparent" }}>{formData["posdeseado"] || "N/A"}</Text>
                            </View>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Formación Académica:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 8 ? "yellow" : "transparent" }}>{formData["formacion"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filaGruesa}>
                            <View style={styles.unicaCelda}>
                                <Text style={{ ...styles.label, width: "30%" }}>Experiencia Profesional:</Text>
                                <Text style={{ ...styles.label, width: "70%", height: "100%", overflow: "hidden", backgroundColor: currentInput === 9 ? "yellow" : "transparent" }}>{formData["experiencia"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filaGruesa}>
                            <View style={styles.unicaCelda}>
                                <Text style={{ ...styles.label, width: "30%" }}>Habilidades:</Text>
                                <Text style={{ ...styles.label, width: "70%", height: "100%", overflow: "hidden", backgroundColor: currentInput === 10 ? "yellow" : "transparent" }}>{formData["habilidades"] || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.filas}>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Idiomas:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 11 ? "yellow" : "transparent" }}>{formData["idiomas"] || "N/A"} - {selectedNivel}</Text>
                            </View>
                        </View>
                        <View style={styles.filaGruesa}>
                            <View style={styles.unicaCelda}>
                                <Text style={styles.label}>Referencias:</Text>
                                <Text style={{ ...styles.label, backgroundColor: currentInput === 12 && isExportingPDF === false ? "yellow" : "transparent" }}>{formData["referencias"] || "N/A"}</Text>
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
                title: "Curriculum Vitae",
                subject: "Curriculum Vitae",
                keywords: "CV, Curriculum Vitae, Empleo",
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
                                        text: "Curriculum Vitae",
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
                saveAs(blob, "Curriculum_Vitae.docx");
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
                <h2 style={{ paddingBlock: "10px" }}>Formulario de Curriculum Vitae</h2>
                <ProgressBar percent={Math.round((100 * (currentInput + 1)) / arregloInputs.length)} tamano={arregloInputs.length} />
                <div className="columnas">
                    <div className="modelo" style={{ display: showhid ? "flex" : "none" }}>
                        <i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i>
                        <img src={contrato} alt="Curriculum Vitae" />
                    </div>
                    <form className="col1" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                        {arregloInputs[currentInput].name === "idiomas" ? (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label>{arregloInputs[currentInput].label}<i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i></label>
                                <input
                                    type={arregloInputs[currentInput].type}
                                    name={arregloInputs[currentInput].name}
                                    placeholder={arregloInputs[currentInput].placeholder}
                                    value={formData[arregloInputs[currentInput].name] || ""}
                                    onChange={handleInputChange}
                                    maxLength={70}
                                    style={{ width: "100%", height: "2em", textIndent: "10px", border: "1px solid gray", outline: "none" }}
                                />
                                {["Básico", "Intermedio", "Avanzado"].map((option, index) => (
                                    <label key={index} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name="idiomaNivel"
                                            value={option}
                                            checked={selectedNivel === option}
                                            onChange={handleCheckboxChange}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label>{arregloInputs[currentInput].label}<i className="ri-information-fill" onClick={() => setShowhid(!showhid)} ></i></label>
                                <input
                                    type={arregloInputs[currentInput].type}
                                    name={arregloInputs[currentInput].name}
                                    placeholder={arregloInputs[currentInput].placeholder}
                                    value={formData[arregloInputs[currentInput].name] || ""}
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
                                    <PDFDownloadLink document={<FormularioPDF />} fileName="Curriculum_Vitae.pdf">
                                        {({ loading }) => (loading ? "Generando PDF..." : <button type="button" style={{ backgroundColor: "tomato" }} onClick={setIsExportingPDF(true)}><i className="ri-save-fill"></i> PDF</button>)}
                                    </PDFDownloadLink>
                                    <button type="button" onClick={handleWord} style={{ backgroundColor: "var(--ColorFont1)" }}><i className="ri-save-fill"></i> Word</button>
                                </>
                            )}
                        </div>
                    </form>
                    <div className="col2">
                        <PDFViewer style={{ height: "100%" }}>
                            <FormularioPDF />
                        </PDFViewer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CurriculumComponent() {
    return (
        <div className="container">
            <div className="col1">
                <Link to="/document/content/formCV/doc">
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
                    <h1>Generador de Curriculum Vitae</h1>
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
                    <Link to="/document/content/formCV/doc" id='rellenar'>Rellenar el modelo</Link>
                </div>
                <div className="explain">

                    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6" }}>
                        <h1 style={{ fontSize: "24px", color: "#333", textAlign: "center" }}>
                            ¿Qué es un Currículum Vitae?
                        </h1>

                        <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
                            Un <strong style={{ color: "#007bff" }}>Currículum Vitae (CV)</strong> es un documento que resume la trayectoria profesional, académica y las habilidades de una persona. Su objetivo principal es destacar tus cualificaciones para optar por un empleo o proyecto profesional.
                        </p>

                        <h2 style={{ fontSize: "20px", color: "#333", marginTop: "20px" }}>
                            ¿Qué información debe contener?
                        </h2>

                        <ul style={{ fontSize: "16px", color: "#555", marginLeft: "20px" }}>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Nombre Completo:</strong> Campo para ingresar tu nombre completo, por ejemplo, "Arturo Vasquez".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Dirección:</strong> Espacio para escribir tu dirección completa, como "Calle Letanias 334".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Ciudad:</strong> Indica la ciudad donde resides, por ejemplo, "Lima".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Código Postal:</strong> Número que identifica tu zona postal, por ejemplo, "07112".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Provincia:</strong> Nombre de la provincia donde resides, como "Callao".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Número de Teléfono:</strong> Campo para ingresar tu número de contacto, como "+51998756425".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Dirección E-mail:</strong> Campo para escribir tu correo electrónico, como "art_vasq@gmail.com".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Posición deseada:</strong> Cargo al que deseas postular, por ejemplo, "Desarrollador Front-End".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Formación Académica:</strong> Información sobre tu educación, por ejemplo, "Ingeniería de Sistemas".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Experiencia Profesional:</strong> Breve descripción de tu experiencia laboral, por ejemplo, "3 años en desarrollo web".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Habilidades:</strong> Lista de tus competencias técnicas o profesionales, como "JavaScript, React, Node.js".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Idiomas:</strong> Lenguajes que hablas o escribes, como "Inglés, Español".
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <strong>Referencias:</strong> Contactos o referencias laborales relevantes, como "Referencia laboral de Juan Pérez".
                            </li>
                        </ul>


                        <p style={{ fontSize: "16px", color: "#555", textAlign: "justify" }}>
                            Un buen currículum debe ser claro, conciso y visualmente atractivo. Es recomendable ajustarlo a cada oferta laboral para resaltar la experiencia y habilidades más relevantes para el puesto.
                        </p>
                    </div>

                </div>
            </div>
        </div>


    );
}
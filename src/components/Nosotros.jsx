import React from "react";

export default function Nosotros() {
  return (
    <div className="container_center">
      <div className="cont_nosotros" style={{
        padding: "3em 2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "3em",
        background: "linear-gradient(135deg, pink, skyblue)",
        color: "#333",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
      }}>

        <div style={{ width: "100%" }}>
          <h2 style={{
            fontSize: "2.5em",
            marginBottom: "0.5em",
            color: "var(--ColorBg3)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)"
          }}>Nosotros</h2>
          <p style={{ width: "70%", margin: "0 auto", fontSize: "1.2em" }}>
            Somos un equipo apasionado por brindar herramientas accesibles y fáciles de usar para generar documentos PDF y Word en cuestión de minutos.
          </p>
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2em" }}>
          <div style={{
            width: "300px",
            padding: "2em",
            background: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ color: "#28a745", marginBottom: "1em" }}>Misión</h3>
            <p style={{ fontSize: "1.1em" }}>
              Facilitar la creación de documentos sin costo, ofreciendo una plataforma intuitiva que permita generar contratos, acuerdos y más, sin complicaciones.
            </p>
          </div>

          <div style={{
            width: "300px",
            padding: "2em",
            background: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ color: "#ffc107", marginBottom: "1em" }}>Visión</h3>
            <p style={{ fontSize: "1.1em" }}>
              Ser la plataforma líder en generación de documentos accesibles, manteniendo nuestro compromiso con el acceso libre y gratuito para todos los usuarios.
            </p>
          </div>

          <div style={{
            width: "300px",
            padding: "2em",
            background: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ color: "#17a2b8", marginBottom: "1em" }}>Valores</h3>
            <p style={{ fontSize: "1.1em" }}>
              Transparencia, compromiso y accesibilidad son nuestros pilares para ofrecerte siempre un servicio confiable y sencillo.
            </p>
          </div>
        </div>

        <div style={{ width: "80%" }}>
          <p style={{ fontSize: "1.2em", marginBottom: "1em" }}>
            Si encuentras útil nuestra herramienta y deseas apoyarnos, tu contribución será fundamental para seguir mejorando.
          </p>
          <button style={{
            padding: "0.7em 2em",
            fontSize: "1.1em",
            color: "#fff",
            backgroundColor: "#007BFF",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
          >
            ¡Haz tu donación aquí!
          </button>
        </div>
      </div>
    </div>
  );
}
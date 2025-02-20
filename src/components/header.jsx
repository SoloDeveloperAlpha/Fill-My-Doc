import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import log from "../assets/Logo2.webp";
import { categories } from './Docmodels.jsx';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [estadoCab, setEstadoCab] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      // Buscar en las opciones el nombre exacto
      const foundOption = options.find(
        (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (foundOption) {
        window.location.href = `/Fill-My-Doc/#${foundOption.link}`;
      } else {
        window.location.href = "/#/pagenotfound";
      }

      // Limpiar el campo después de buscar
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const options = categories.flatMap((categoria) =>
    categoria.items.map((item) => ({
      name: item.name,
      link: item.link,
    }))
  );

  // Filtrar opciones basadas en el término de búsqueda
  const filteredOptions = options.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejador para selección de sugerencia
  const handleSelect = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  return (
    <>
      <div className={estadoCab ? "cabecera_oculta" : "cabecera_oculta hid"}>
        <nav>
          <ul style={{ width: "100%" }}>
            <li><Link to="/inicio" onClick={() => setEstadoCab(!estadoCab)} >INICIO</Link></li>
            <li><Link to="/document" onClick={() => setEstadoCab(!estadoCab)}>DOCUMENTOS</Link></li>
            <li><Link to="/nosotros" onClick={() => setEstadoCab(!estadoCab)}>NOSOTROS</Link></li>
          </ul>
        </nav>

      </div>
      <div className="cabecera">
        <div className="cab">
          <div className="logo">
            <Link style={{ display: "flex" }} to="/inicio">
              <img src={log} style={{ width: "14em" }} alt="Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/inicio">INICIO</Link></li>
              <li><Link to="/document">DOCUMENTOS</Link></li>
              <li><Link to="/nosotros">NOSOTROS</Link></li>
            </ul>
          </nav>
          <div className="buscador">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Buscar"
              value={searchTerm}
              autoComplete="off"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleSearch}
            />
            <i className="ri-search-line" onClick={handleSearch}></i>
            {showSuggestions && searchTerm && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  border: "1px solid #ccc",
                  borderTop: "none",
                  backgroundColor: "white",
                  maxHeight: "150px",
                  overflowY: "auto",
                  borderRadius: "0 0 5px 5px",
                  zIndex: 100,
                  marginTop: "2px",
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item) => (
                    <li
                      key={item.name}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        transition: "background-color 0.2s",
                      }}
                      onMouseDown={() => handleSelect(item.name)}
                    >
                      <Link
                        to={item.link}
                        style={{
                          textDecoration: "none",
                          color: "#333",
                          display: "block",
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li
                    style={{
                      padding: "8px",
                      color: "#999",
                    }}
                  >
                    No se encontraron resultados
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className='menu-logo'>
          <i className="ri-menu-line" style={{ cursor: "pointer" }} onClick={() => setEstadoCab(!estadoCab)}></i>
        </div>
      </div>
    </>
  );
}

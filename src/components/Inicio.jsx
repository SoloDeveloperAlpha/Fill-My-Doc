import React, { useState } from 'react'
import Logo3 from "../assets/Logo3.webp";
import { categories } from './Docmodels.jsx';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const selectedOption = document.querySelector(`#search-options option[value="${searchTerm}"]`);
      const link = selectedOption ? selectedOption.getAttribute('data-link') : null;

      if (link) {
        window.location.href = link;
      }
    }
  };

  return (
    <div className="container_center">
      <div className='Inicio'>
        <div className='tit_ini'>
          <h2>¡Crea fácilmente tus documentos legales!</h2>
          <h3>Un formulario muy intuitivo te guiará en la redacción de tus documentos</h3>
          <div className="tit_search">
            <input type="search" name="inp_search" id="inp_search" list="search-options" placeholder='Buscar Documento' onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} />
            <i className="ri-search-line"></i>
            <datalist id="search-options">
              {categories.flatMap(categoria =>
                categoria.items.map(item => (
                  <option key={item.name} value={item.name} data-link={item.link} />
                ))
              )}
            </datalist>
          </div>
          <div className='funcionamiento'>
            <img src={Logo3} style={{ width: "18em", height: "18em" }} alt="a4" />
            <div className="pasos" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
              <h2>¿Como funciona?</h2>
              <div className="tarjeta_pasos">
                <span style={{ display: "grid", placeContent: "center", backgroundColor: "var(--ColorFont1)", width: "30px", height: "30px", borderRadius: "50%", color: "white", fontWeight: "bold" }}>1</span>
                <div className="paso">
                  <h3>1. Elegir este modelo</h3>
                  <span>Empieza haciendo clic en "Rellenar el modelo"</span>
                </div>
              </div>
              <div className="tarjeta_pasos">
                <span style={{ display: "grid", placeContent: "center", backgroundColor: "var(--ColorFont1)", width: "30px", height: "30px", borderRadius: "50%", color: "white", fontWeight: "bold" }}>2</span>
                <div className="paso">
                  <h3>2. Rellenar el documento</h3>
                  <span>Contesta a algunas preguntas y tu documento tipo se creará automáticamente.</span>
                </div>
              </div>
              <div className="tarjeta_pasos">
                <span style={{ display: "grid", placeContent: "center", backgroundColor: "var(--ColorFont1)", width: "30px", height: "30px", borderRadius: "50%", color: "white", fontWeight: "bold" }}>3</span>
                <div className="paso">
                  <h3>3. Guardar - Imprimir</h3>
                  <span>¡Tu documento está ya listo! Lo recibirás en los formatos Word y PDF. Lo podrás modificar.</span>
                </div>
              </div>
              <div className="tarjeta_pasos">
                <span style={{ display: "grid", placeContent: "center", backgroundColor: "var(--ColorFont1)", width: "30px", height: "30px", borderRadius: "50%", color: "white", fontWeight: "bold" }}>4</span>
                <div className="paso">
                  <h3>4. Consultar a un abogado</h3>
                  <span>Puedes optar por recurrir a los servicios de un abogado después de haber rellenado el documento.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ini_sec_docs">
          <h2>Ejemplo de documentos tipo disponibles</h2>
          <div className='ini_docs_cols'>
            <div className='col1_docs'>
              <h3>Personales y de Identificación</h3>
              <ul>
                {categories.flatMap((categoria) =>
                  categoria.title === "Personales y de Identificación"
                    ? categoria.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link to={item.link} style={{ fontSize: ".8em" }}>
                          {item.name}
                        </Link>
                      </li>
                    ))
                    : []
                )}
              </ul>
            </div>
            <div className='col2_docs'>
              <h3>Financieros</h3>
              <ul>
                <ul>
                  {categories.flatMap((categoria) =>
                    categoria.title === "Financieros"
                      ? categoria.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link to={item.link} style={{ fontSize: ".8em" }}>
                            {item.name}
                          </Link>
                        </li>
                      ))
                      : []
                  )}
                </ul>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

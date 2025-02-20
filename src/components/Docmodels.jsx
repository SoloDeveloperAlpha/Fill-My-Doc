import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';

export const categories = [
  {
    title: "Personales y de Identificación", items: [
      { name: "Formato de solicitud de empleo", link: "/Fill-My-Doc/document/content/solempleo" },
      { name: "Formato de currículum vitae (CV)", link: "/Fill-My-Doc/document/content/formCV" },
      { name: "Carta de recomendación laboral o personal", link: "/Fill-My-Doc/document/content/recLetter" },
      { name: "Carta de renuncia", link: "/Fill-My-Doc/document/content/cartaRenuncia" },
      { name: "Carta de autorización (para trámites diversos)", link: "/Fill-My-Doc/document/content/cartaAutorizacion" },
      { name: "Formulario para renovación de DNI o pasaporte", link: "/Fill-My-Doc/document/content/renovDNIPassP" },
    ]
  },
  {
    title: "Financieros", items: [
      { name: "Formulario para apertura de cuenta bancaria", link: "/Fill-My-Doc/document/content/solAccountOpen" },
      { name: "Solicitud de crédito personal o hipotecario", link: "/Fill-My-Doc/document/content/solCredHip" },
      { name: "Contrato de arrendamiento de Vivienda Habitual", link: "/Fill-My-Doc/document/content/contrArrend" },
      { name: "Declaración jurada de ingresos", link: "/Fill-My-Doc/document/content/declarJurIng" },
      { name: "Formulario de declaración de impuestos", link: "/Fill-My-Doc/document/content/formDeclJurImp" },
    ]
  },
  {
    title: "Legales", items: [
      { name: "Contratos (compraventa, préstamo, servicio)", link: "/Fill-My-Doc/document/content/contratGen" },
      { name: "Poder notarial simple", link: "/Fill-My-Doc/document/content/poderNotarial" },
      { name: "Declaración jurada de domicilio", link: "/Fill-My-Doc/document/content/declarJurDom" },
      { name: "Acuerdo de confidencialidad (NDA)", link: "/Fill-My-Doc/document/content/acuerdoNDA" },
    ],
  }
];

export default function Docmodels() {
  const [openCategories, setOpenCategories] = useState(
    Object.fromEntries(categories.map((_, index) => [index, true]))
  );

  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container_center">
      <div className="cont_tipos_docs">
        <h2>Modelo de Documentos disponibles</h2>
        <div className="list_categories">
          <ul>
            {categories.map((category, index) => (
              <li key={index} style={{ borderBottom: "1px solid rgb(223, 223, 223)" }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: "1em",
                    cursor: 'pointer',
                    fontSize: '1em',
                    fontWeight: '600',
                    paddingBottom: ".5em"
                  }}
                  onClick={() => toggleCategory(index)}
                >
                  {category.title}
                  {openCategories[index] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openCategories[index] && (
                  <ul style={{ marginTop: '0.5rem', marginLeft: '2rem', gap: '0.5rem', color: '#4B5563' }}>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link to={item.link} style={{ fontSize: ".8em" }}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

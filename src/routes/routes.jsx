import { createHashRouter } from "react-router-dom";
import Inicio from "../components/Inicio.jsx";
import Docmodels from "../components/Docmodels.jsx";
import SolEmpleo, { SolsEmpleoComponent } from "../components/Formatos/Personales&Identificacion/Sol-empleo.jsx";
import FormCV, { CurriculumComponent } from "../components/Formatos/Personales&Identificacion/Form-CV.jsx";
import RecommendationLetter, { RecommendationComponent } from "../components/Formatos/Personales&Identificacion/RecommendationLetter.jsx";
import CartaRenuncia, { RenunciaComponent } from "../components/Formatos/Personales&Identificacion/CartaRenuncia.jsx";
import CartaAutorizacion, { AutorizacionComponent } from "../components/Formatos/Personales&Identificacion/CartaAutorizacion.jsx";
import RenovacionDNIoPassP, { RenovDNIPassComponent } from "../components/Formatos/Personales&Identificacion/RenovacionDNIoPassP.jsx";
import FormAccountOpening, { FormAccOpenComponent } from "../components/Formatos/Financieros/SolAperturaCuentaBancaria.jsx";
import SolCredPerHipot, { SolCredPerHipotComponent } from "../components/Formatos/Financieros/SolCredPerHipotecario.jsx";
import ContratoArrend, { ContratArrendComponent } from "../components/Formatos/Financieros/ContratoArrend.jsx";
import DeclaracionJuradaIng, { DeclarJuradIngComponent } from "../components/Formatos/Financieros/DeclaracionJuradaIng.jsx";
import FormDeclJuradaIMp, { FormDeclarJuradImpComponent } from "../components/Formatos/Financieros/FormDeclJuradaIMp.jsx";
import ContratoUsoGeneral, { ContratoUsoGeneralComponent } from "../components/Formatos/Legales/ContratoUsoGeneral.jsx";
import PoderNotarial, { PoderNotarialComponent } from "../components/Formatos/Legales/PoderNotarial.jsx";
import DeclaracionJuradaDom, { DeclarJuradDomComponent } from "../components/Formatos/Legales/DeclaracionJuradaDom.jsx";
import AcuerdoConfNDA, { AcuerdoNDAComponent } from "../components/Formatos/Legales/AcuerdoConfNDA.jsx";
import Nosotros from "../components/Nosotros.jsx";
import NOFILE from "../components/Loadings/NOFILE.jsx";
import App from "../App.jsx";

const routes = createHashRouter([
  {
    path: '/', element: <App />, children: [
      { path: '/inicio', element: <Inicio /> },
      { path: '/document', element: <Docmodels /> },
      { path: '/nosotros', element: <Nosotros /> },
      { path: '/pagenotfound', element: <NOFILE /> },
      { path: '/document/content/renovDNIPassP/doc', element: <RenovacionDNIoPassP /> },
      { path: '/document/content/renovDNIPassP', element: <RenovDNIPassComponent /> },
      { path: '/document/content/recLetter/doc', element: <RecommendationLetter /> },
      { path: '/document/content/recLetter', element: <RecommendationComponent /> },
      { path: '/document/content/solempleo/doc', element: <SolEmpleo /> },
      { path: '/document/content/solempleo', element: <SolsEmpleoComponent /> },
      { path: '/document/content/cartaRenuncia/doc', element: <CartaRenuncia /> },
      { path: '/document/content/cartaRenuncia', element: <RenunciaComponent /> },
      { path: '/document/content/cartaAutorizacion', element: <AutorizacionComponent /> },
      { path: '/document/content/cartaAutorizacion/doc', element: <CartaAutorizacion /> },
      { path: '/document/content/formCV', element: <CurriculumComponent /> },
      { path: '/document/content/formCV/doc', element: <FormCV /> },
      { path: '/document/content/solAccountOpen/doc', element: <FormAccountOpening /> },
      { path: '/document/content/solAccountOpen', element: <FormAccOpenComponent /> },
      { path: '/document/content/solCredHip/doc', element: <SolCredPerHipot /> },
      { path: '/document/content/solCredHip', element: <SolCredPerHipotComponent /> },
      { path: '/document/content/contrArrend/doc', element: <ContratoArrend /> },
      { path: '/document/content/contrArrend', element: <ContratArrendComponent /> },
      { path: '/document/content/declarJurIng/doc', element: <DeclaracionJuradaIng /> },
      { path: '/document/content/declarJurIng', element: <DeclarJuradIngComponent /> },
      { path: '/document/content/formDeclJurImp/doc', element: <FormDeclJuradaIMp /> },
      { path: '/document/content/formDeclJurImp', element: <FormDeclarJuradImpComponent /> },
      { path: '/document/content/contratGen/doc', element: <ContratoUsoGeneral /> },
      { path: '/document/content/contratGen', element: <ContratoUsoGeneralComponent /> },
      { path: '/document/content/poderNotarial/doc', element: <PoderNotarial /> },
      { path: '/document/content/poderNotarial', element: <PoderNotarialComponent /> },
      { path: '/document/content/declarJurDom/doc', element: <DeclaracionJuradaDom /> },
      { path: '/document/content/declarJurDom', element: <DeclarJuradDomComponent /> },
      { path: '/document/content/acuerdoNDA/doc', element: <AcuerdoConfNDA /> },
      { path: '/document/content/acuerdoNDA', element: <AcuerdoNDAComponent /> }
    ]
  }

]);

export default routes;
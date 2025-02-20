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

const routes = [
  { path: '/Fill-My-Doc', element: <Inicio /> },
  { path: '/Fill-My-Doc/document', element: <Docmodels /> },
  { path: '/Fill-My-Doc/nosotros', element: <Nosotros /> },
  { path: '/Fill-My-Doc/pagenotfound', element: <NOFILE /> },
  { path: '/Fill-My-Doc/document/content/renovDNIPassP/doc', element: <RenovacionDNIoPassP /> },
  { path: '/Fill-My-Doc/document/content/renovDNIPassP', element: <RenovDNIPassComponent /> },
  { path: '/Fill-My-Doc/document/content/recLetter/doc', element: <RecommendationLetter /> },
  { path: '/Fill-My-Doc/document/content/recLetter', element: <RecommendationComponent /> },
  { path: '/Fill-My-Doc/document/content/solempleo/doc', element: <SolEmpleo /> },
  { path: '/Fill-My-Doc/document/content/solempleo', element: <SolsEmpleoComponent /> },
  { path: '/Fill-My-Doc/document/content/cartaRenuncia/doc', element: <CartaRenuncia /> },
  { path: '/Fill-My-Doc/document/content/cartaRenuncia', element: <RenunciaComponent /> },
  { path: '/Fill-My-Doc/document/content/cartaAutorizacion', element: <AutorizacionComponent /> },
  { path: '/Fill-My-Doc/document/content/cartaAutorizacion/doc', element: <CartaAutorizacion /> },
  { path: '/Fill-My-Doc/document/content/formCV', element: <CurriculumComponent /> },
  { path: '/Fill-My-Doc/document/content/formCV/doc', element: <FormCV /> },
  { path: '/Fill-My-Doc/document/content/solAccountOpen/doc', element: <FormAccountOpening /> },
  { path: '/Fill-My-Doc/document/content/solAccountOpen', element: <FormAccOpenComponent /> },
  { path: '/Fill-My-Doc/document/content/solCredHip/doc', element: <SolCredPerHipot /> },
  { path: '/Fill-My-Doc/document/content/solCredHip', element: <SolCredPerHipotComponent /> },
  { path: '/Fill-My-Doc/document/content/contrArrend/doc', element: <ContratoArrend /> },
  { path: '/Fill-My-Doc/document/content/contrArrend', element: <ContratArrendComponent /> },
  { path: '/Fill-My-Doc/document/content/declarJurIng/doc', element: <DeclaracionJuradaIng /> },
  { path: '/Fill-My-Doc/document/content/declarJurIng', element: <DeclarJuradIngComponent /> },
  { path: '/Fill-My-Doc/document/content/formDeclJurImp/doc', element: <FormDeclJuradaIMp /> },
  { path: '/Fill-My-Doc/document/content/formDeclJurImp', element: <FormDeclarJuradImpComponent /> },
  { path: '/Fill-My-Doc/document/content/contratGen/doc', element: <ContratoUsoGeneral /> },
  { path: '/Fill-My-Doc/document/content/contratGen', element: <ContratoUsoGeneralComponent /> },
  { path: '/Fill-My-Doc/document/content/poderNotarial/doc', element: <PoderNotarial /> },
  { path: '/Fill-My-Doc/document/content/poderNotarial', element: <PoderNotarialComponent /> },
  { path: '/Fill-My-Doc/document/content/declarJurDom/doc', element: <DeclaracionJuradaDom /> },
  { path: '/Fill-My-Doc/document/content/declarJurDom', element: <DeclarJuradDomComponent /> },
  { path: '/Fill-My-Doc/document/content/acuerdoNDA/doc', element: <AcuerdoConfNDA /> },
  { path: '/Fill-My-Doc/document/content/acuerdoNDA', element: <AcuerdoNDAComponent /> },
];

export default routes;
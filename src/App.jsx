import Header from './components/header.jsx';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer.jsx';
import './App.css';
import ScrollToTop from './utils/ScrollToTop.jsx';
//Usar BrowserRouter para que funcione el enrutamiento de React
//Usar HashRouter para que funcione el enrutamiento de React en Github Pages solo si es NECESARIO

function App() {
  return (
    <div className='App'>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

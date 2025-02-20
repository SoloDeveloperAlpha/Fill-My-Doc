import Header from './components/header.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from './components/Footer.jsx';
import routes from './routes/routes.jsx';
import './App.css';
import ScrollToTop from './utils/ScrollToTop.jsx';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App

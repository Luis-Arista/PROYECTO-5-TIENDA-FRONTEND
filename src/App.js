import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import { UserProvider } from './Context/Usuario/UserProvider';
import Registrar from './Pages/Registrar/Registrar';
import MiPerfil from './Pages/MiPerfil/MiPerfil';
import Error404 from './Pages/Error404/Error404';
import Favoritos from './Pages/Favoritos/Favoritos';
import Productos from './Pages/Productos/Productos';
import AgregarProductos from './Pages/AgregarProductos/AgregarProductos';
import InforArticulo from './Pages/InforArticulo/InforArticulo';
import { EstadoProvider } from './Context/Usuario/EstadoProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PayPalScriptProvider options = {
          {
            "client-id": "ASPLJ9Et9ubrNE0d1TC5U2AMcGBCWdw7_Uplkcdi141wTTWEo_nFneaEzq8PPdbP4c5jFzPnIBohNP7O",
            components: 'buttons',
            currency: 'MXN'

          }
        }>
          <EstadoProvider>
            <Navbar />
            <Routes>
              <Route path='/' element = { <Home /> } />
              <Route path='/login' element = { <Login /> } />
              <Route path='/registrar' element = { <Registrar /> } />
              <Route path='/perfil' element = { <MiPerfil /> } />
              <Route path='/agregar/productos' element = { <AgregarProductos /> } />
              <Route path='/agregar/productos/:id' element = { <AgregarProductos /> } />
              <Route path='/favoritos' element = { <Favoritos /> } />
              <Route path='/productos' element = { <Productos /> } />
              <Route path='productos/:id' element = { <InforArticulo /> } />
              <Route path='*' element = { <Error404 /> } />
            </Routes>
            <Footer />
          </EstadoProvider>
        </PayPalScriptProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

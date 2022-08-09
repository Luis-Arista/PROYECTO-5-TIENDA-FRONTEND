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

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/' element = { <Home /> } />
          <Route path='/login' element = { <Login /> } />
          <Route path='/registrar' element = { <Registrar /> } />
          <Route path='/perfil' element = { <MiPerfil /> } />
          <Route path='/agregar/productos' element = { <AgregarProductos /> } />
          <Route path='/favoritos' element = { <Favoritos /> } />
          <Route path='/productos' element = { <Productos /> } />
          <Route path='productos/:id' element = { <InforArticulo /> } />
          <Route path='*' element = { <Error404 /> } />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

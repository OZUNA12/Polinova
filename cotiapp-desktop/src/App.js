import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarHidden from './components/NavbarHidden';
import Index from './pages/Index';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Usuario from './pages/Usuario';
import EditarEmpresa from './pages/EditarEmpresa';
import LoggedRoute from './routes/LoggedRoute';
import DiosRoute from './routes/DiosRoute';
import AdminRoute from './routes/AdminRoute';
import ModeradorRoute from './routes/ModeradorRoute';
import EditarUsuario from './pages/EditarUsuario';

function App() {
  return (
    <div>
      <Navbar/>
      <NavbarHidden/>
      <div>
        <Routes>
          <Route path='/' element={<LoggedRoute><Index/></LoggedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/usuario' element={<LoggedRoute><Usuario/></LoggedRoute>}/>
          <Route path='/editar/empresa' element={<AdminRoute><EditarEmpresa/></AdminRoute>}/>
          <Route path='/editar/usuario' element={<EditarUsuario/>}/>



        </Routes>
      </div>
    </div>
  );
}

export default App;

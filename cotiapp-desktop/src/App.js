import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarHidden from './components/NavbarHidden';
import Index from './pages/Index';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Usuario from './pages/Usuario';
import LoggedRoute from './routes/LoggedRoute';

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


        </Routes>
      </div>
    </div>
  );
}

export default App;

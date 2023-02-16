import {Routes, Route} from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Logout from './pages/Logout';
import LoggedRoute from './routes/LoggedRoute';

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<LoggedRoute><Index/></LoggedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>


        </Routes>
    </div>
  );
}

export default App;

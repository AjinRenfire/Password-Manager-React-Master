import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import {app,database} from './firebaseConfig';
import Notfound from './components/Notfound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register database={database}/>} />
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home database={database}/>} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </div>
  );
}

export default App;

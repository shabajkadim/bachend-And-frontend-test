import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Component/Home';
import Register from './Component/Register';
import Login from './Component/Login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/user-register' element={<Register/>} />
        <Route path='/user-login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;

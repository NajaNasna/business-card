import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import ForgotPass from './Components/ForgotPass';

function App() {
  return (

    <Router>

    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-pass' element={<ForgotPass/>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;

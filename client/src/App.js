import Login from './Components/Login';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css'
import Home from './components/Student/Home/Home'
import {  Routes, Route,  } from "react-router-dom";
import ItemDetails from './components/Student/Items/ItemDetails';
import Sidebar from './components/Student/Sidebar/Sidebar';
import Menu from './components/Student/Menu/Menu';
import StudentNavbar from './components/Student/StudentNavbar/StudentNavbar';

function App() {

  return (
    <>
    <StudentNavbar/>
    <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/item/:id" element={<ItemDetails/>}/>
        <Route path="/menu" element={<Menu/>}/>
      </Routes>
      
    </>
  )
}

export default App

import './App.css'
import Home from './components/Student/Home/Home'
import {  Routes, Route,  } from "react-router-dom";
import ItemDetails from './components/Student/Items/ItemDetails';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/item/:id" element={<ItemDetails/>}/>
      </Routes>
      
    </>
  )
}

export default App

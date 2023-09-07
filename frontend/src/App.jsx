import './App.css'
import Home from './components/Student/Home/Home'
import {  Routes, Route,  } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      
    </>
  )
}

export default App

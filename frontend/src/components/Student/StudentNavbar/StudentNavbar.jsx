import React from 'react'
import "./StudentNavbar.css"
import {Utensils} from "lucide-react"
import { Link } from 'react-router-dom'

const StudentNavbar = () => {
  return (
    <div className='nb-main'>
        <nav className='nb-con'>
          <Utensils/>
          <Link to="/">
            <li className="nb-li">Home</li>
          </Link>
            <li className="nb-li">Support</li>
            <li className="nb-li">About</li>
            <li className="nb-li">Pricing</li>
            <span>|</span>
            <button className='nb-lb'>Login</button>
        </nav>
    </div>
  )
}

export default StudentNavbar
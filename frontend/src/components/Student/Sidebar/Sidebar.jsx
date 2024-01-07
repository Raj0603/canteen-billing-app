import React from 'react'
import "./Sidebar.css"
import {MenuSquare, ShoppingCart, BookOpen, User2, Settings, LogOut} from "lucide-react"
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
    <div className="ssb-main">
        <ul className='ssb-ul'>
          <Link to="/menu">
            <li className="ssb-li">Menu</li>
          </Link>
            <li className="ssb-li">Cart</li>
            <li className="ssb-li"> Orders</li>
            <li className="ssb-li">Profile</li>
            <li className="ssb-li">Setting</li>
            
        </ul>
    </div>
    </>
  )
}

export default Sidebar
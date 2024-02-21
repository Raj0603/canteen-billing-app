import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
import {Utensils, User, ShoppingCart, List} from "lucide-react"

const Footer = () => {
  return (
    <div className='footer-main'>
      <Link to="/menu">
      <Utensils/>
      </Link>
      <Link to="/cart">
      <ShoppingCart />
      </Link>
      <Link to="/myorders">
      <List/>
      </Link>
      <Link to="/saccount" >
      <User />
      </Link>
      {/* <span className='fm-cd'></span> */}
    </div>
  )
}

export default Footer
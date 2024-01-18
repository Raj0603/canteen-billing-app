import React from 'react'
import cartIcon from "../../../assets/cart.svg"
import {Link} from "react-router-dom"

const EmptyCart = () => {
  return (
    <div className='ec-mc'>
        <img src={cartIcon} alt="" />
        <h2>Your Cart is Empty :)</h2>
        <p>Add some food items to proceed to cart</p>
        <Link to="/menu">
        <button className="ec-bb">
            Browse Menu
        </button>
        </Link>
    </div>
  )
}

export default EmptyCart
import React from 'react'
import orderSucccess from "../../../assets/ordersuccess.svg"
import "./OrderSuccess.css"
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {

  const navigate = useNavigate();
  return (
    <div className='os-mc'>
      <img src={orderSucccess} alt="" />
      <h2>Your Order Has Been Placed. Thankyou for ordering with us!</h2>

      <button className='os-vob' onClick={() => navigate("/myorders") }>View Order</button>

    </div>
  )
}

export default OrderSuccess
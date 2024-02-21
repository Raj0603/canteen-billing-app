import React from 'react'
import orderSucccess from "../../../assets/ordersuccess.svg"
import "./OrderSuccess.css"
import { useNavigate } from 'react-router-dom'
import Footer from '../Sidebar/Footer'

const OrderSuccess = () => {

  const navigate = useNavigate();
  return (
    <>
    <Footer/>
    <div className='os-mc'>
      <img src={orderSucccess} alt="" className='os-mi' style={{height:"30vh"}}/>
      <h2 style={{textAlign:"center"}}>Your Order Has Been Placed. Thankyou for ordering with us!</h2>

      <button className='os-vob' onClick={() => navigate("/myorders") }>View Order</button>

    </div>
    </>
  )
}

export default OrderSuccess
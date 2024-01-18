import React from 'react'
import "./MyOrder.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { myOrders } from "../../../actions/orderAction";
import { useAlert } from "react-alert";
import OrderCard from './OrderCard';

export const MyOrder = () => {

  // const alert = useAlert();
  // const dispatch = useDispatch();
  // const { order } = useSelector((state) => state.myOrders);

  // useEffect(() => {
    
  //   dispatch(myOrders())
  // },[dispatch])
  

  return (
    <div className='my-mc'>
      
    </div>
  )
}

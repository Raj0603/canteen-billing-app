import React, { useEffect, useState } from "react";
import OrderCard from "../Student/Orders/OrderCard";
import "./OwnerList.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrderDetails } from "../../actions/orderAction";
import {Search} from "lucide-react"

const OrderList = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.orderDetails);
  

    const findOrderHandler = (e) =>{
      e.preventDefault();
      dispatch(getAdminOrderDetails(orderId));
    }




  const [orderId, setOrderId] = useState("");
  return (
    <div className="ol-mc">
      <form 
      onSubmit={findOrderHandler}
      className="ol-sf"
      >
        <input
          type="text"
          className="ol-oid"
          placeholder="Enter Order ID"
          onKeyDown={(e) => {
            e.key === "Enter" ? setOrderId(e.target.value) : null;
          }}
        />
        <Search/>
      </form>

      {order != null && order?.orderItems? <><OrderCard order={order}/></>:<></>}
    </div>
  );
};

export default OrderList;

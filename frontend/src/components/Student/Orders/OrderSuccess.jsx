import React, { useState } from "react";
import orderSucccess from "../../../assets/ordersuccess.svg";
import "./OrderSuccess.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../Sidebar/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../actions/orderAction";
import { useAlert } from "react-alert";
import { emptyCartItems } from "../../../actions/cartAction";
import { useEffect } from "react";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const alert = useAlert();

  const searchQuerry = useSearchParams()[0];

  const payId = searchQuerry.get('reference')

  const totalAmount = cartItems.reduce(
    (acc, foodItem) => acc + foodItem.quantity * foodItem.price,
    0
  );

  const placeOrder = {
    orderItems: cartItems,
    paymentId: payId,
    totalPrice: totalAmount,
  };
  
  const clearCart = () => {
    dispatch(emptyCartItems());
  };

  useEffect(() => {
    if (!orderPlaced) {
      const fetchData = async () => {
        try {
          const { data } = await axios.post(
            "/api/v1/orderverify",
            searchQuerry
          );
          if (data.verified) {
            dispatch(createOrder(placeOrder));
            clearCart();
            setOrderPlaced(true);
            alert.success("Order Placed successfully")
          } else {
            alert.error("Invalid reference ID");
          }
        } catch (error) {
          console.error("Error:", error);
          alert.error("An error occurred while processing your order");
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      {orderPlaced ? (
        <>
          <Footer />
          <div className="os-mc">
            <img
              src={orderSucccess}
              alt=""
              className="os-mi"
              style={{ height: "30vh" }}
            />
            <h2 style={{ textAlign: "center" }}>
              Your Order Has Been Placed. Thankyou for ordering with us!
            </h2>

            <span>{}</span>

            <button className="os-vob" onClick={() => navigate("/myorders")}>
              View Order
            </button>
          </div>
        </>
      ) : (
        <>
        <div style={{display:"flex",justifyContent:"center", flexDirection:"column", alignItems:"center",gap:"20px", marginTop:"40vh"}}>
          <h2>Invalid Order ID</h2>

          <Link to="/menu">
          
          <button className="ec-bb">Home</button>
          </Link>

        </div>
        </>
      )}
    </>
  );
};

export default OrderSuccess;

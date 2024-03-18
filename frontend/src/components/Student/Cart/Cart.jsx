import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartItems } from "../../../actions/cartAction";
import EmptyCart from "./EmptyCart";
import Footer from "../Sidebar/Footer";
import axios from "axios";
import {useAlert} from "react-alert"
import logo from "../../../assets/logoo.png";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const { student } = useSelector((state) => state.student);

  const alert = useAlert();

  const totalAmount = cartItems.reduce(
    (acc, foodItem) => acc + foodItem.quantity * foodItem.price,
    0
  );

  const clearCart = () => {
    dispatch(emptyCartItems());
  };

  const checkoutHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`/api/v1/getkey`);

    const {
      data: { order },
    } = await axios.post(`/api/v1/checkout`, { amount: totalAmount });

    console.log(order)

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "CAN3 APP", //your business name
      description: "Test Transaction",
      image: logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `/api/v1/payment`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: student.name, //your customer's name
        email: student.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#e74c3c",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.open();

  };

  return (
    <>
      <Footer />
      {cartItems.length === 0 ? (
        <>
          <EmptyCart />
        </>
      ) : (
        <div className="cart-mc">
          <h2 className="cart-heading">Your Cart</h2>

          {cartItems &&
            cartItems.map((foodItem) => (
              <div className="cartContainer" key={foodItem.item}>
                <CartItemCard foodItem={foodItem} />
              </div>
            ))}

          <div className="cart-td">
            <div className="cart-total">
              <span className="cart-tt">Total</span>
              <span className="cart-ts">{`${totalAmount}`}</span>
            </div>
            <div className="cart-co">
              <button className="cart-cb" onClick={checkoutHandler}>
                Checkout
              </button>
              <button onClick={clearCart} className="cart-clb">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

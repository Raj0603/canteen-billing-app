import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {createOrder} from "../../../actions/orderAction"
import { useSelector } from "react-redux";
import { emptyCartItems } from "../../../actions/cartAction";
import EmptyCart from "./EmptyCart";

// import {
//   addItemsToCart,
// } from "../../../actions/cartAction";
// import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  //   const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, foodItem) => acc + foodItem.quantity * foodItem.price,
    0
  );

  const order = {
    orderItems: cartItems,

    totalPrice: totalAmount,
  };
  const clearCart = () => {
    dispatch(emptyCartItems());
  };

  const checkoutHandler = () => {
    dispatch(createOrder(order));
    navigate("/ordersuccess");
    clearCart();
  };

  return (
    <>
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
              <span>Total</span>
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

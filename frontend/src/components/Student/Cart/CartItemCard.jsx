import React from "react";
import "./CartItemCard.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItemsFromCart,
  addItemsToCart,
} from "../../../actions/cartAction";
import vegImg from "../../../assets/iv.png";
import nonVegImg from "../../../assets/inv.png";

const CartItemCard = ({ foodItem }) => {
  const dispatch = useDispatch();

  let icon = "";

  if (foodItem.type == "Veg") {
    icon = <img src={vegImg} alt="" className="cic-ti" />;
  } else {
    icon = <img src={nonVegImg} alt="" className="cic-ti" />;
  }
  const increaseQuantity = (id, quantity) => {
    const newQty = quantity + 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <div className="cic-mc" key={foodItem.item}>
      <div className="cic-dc">
        <img src={foodItem.image} alt="" className="cic-img" />
      </div>
      <div className="cic-sc">
        <div className="cic-nt">
          <Link to={`/item/${foodItem.item}`}>
            <span style={{fontSize:"medium"}}>{foodItem.name}</span>
          </Link>
          {icon}
        </div>
        <div className="cic-qty">
          <button
            onClick={() => decreaseQuantity(foodItem.item, foodItem.quantity)}
            className="cic-qb"
          >
            -
          </button>
          <input
            type="number"
            value={foodItem.quantity}
            readOnly
            className="cic-qn"
          />
          <button
            onClick={() => increaseQuantity(foodItem.item, foodItem.quantity)}
            className="cic-qb"
          >
            +
          </button>
        </div>
      </div>
      <div className="cic-dc cic-tp">{foodItem.price * foodItem.quantity}
      
      <p onClick={() => deleteCartItems(foodItem.item)} style={{textDecoration:"underline",cursor:"pointer", fontSize:"small"}}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;

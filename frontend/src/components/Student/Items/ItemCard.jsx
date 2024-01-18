import React from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component"
import vegImg from "../../../assets/iv.png"
import nonVegImg from "../../../assets/inv.png"
import "./ItemCard.css"
import { addItemsToCart } from "../../../actions/cartAction";

const ItemCard = ({item}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {cartItems} = useSelector((state)=>state.cart)
  

const addToCartHandler = () => {
  const existingItem = cartItems.find((cartItem) => cartItem.item._id === item._id);
  const quantity = existingItem ? existingItem.quantity + 1 : 1;

  dispatch(addItemsToCart(item._id, quantity));
  alert.success("Item added to cart");
};

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor:"#ffd700",
        value: item.rating,
        isHalf: true
    }

    let icon = "";

    if (item.type == "Veg") {
        icon = <img src={vegImg} alt="" />
    }else{
        icon = <img src={nonVegImg} alt="" />
    }


  return (
    <div className = "itemCard">

    <Link className='ic-lt' to={`/item/${item._id}`}>
        <img src={item.images[0].url} alt="item image" className='ic-im' />
        <div className="ic-fd">

        <span className='ic-in'>{item.name}</span>
        <span className='ic-ii'>{icon}</span>
        </div>
        <span className="ic-ip">₹{item.price}</span>
        <div className="ic-sd front">

        <ReactStars {...options} /> <span className='ic-ir'>({item.numOfReviews} Reviews)</span>
        </div>
        <div className="ic-td">
        </div>
    </Link>
    <div className="ic-fd">

        <button className="ic-bn">Buy Now</button>
        <button className="ic-atc" onClick={addToCartHandler}>Add to cart</button>
    </div>
    </div>
  )
}

export default ItemCard

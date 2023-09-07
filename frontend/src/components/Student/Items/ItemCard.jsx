import React from 'react';
import {Link} from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import vegImg from "../../../assets/iv.png"
import nonVegImg from "../../../assets/inv.png"
import "./ItemCard.css"

const ItemCard = ({item}) => {

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor:"#ffd700",
        value: 3,
        isHalf: true
    }

    let icon = "";

    if (item.type == "veg") {
        icon = <img src={vegImg} alt="" />
    }else{
        icon = <img src={nonVegImg} alt="" />
    }


  return (
    <div className = "itemCard">

    <Link className='ic-lt' to={item._id}>
        <img src={item.images[0].url} alt="item image" className='ic-im' />
        <div className="ic-fd">

        <span className='ic-in'>{item.name}</span>
        <span className='ic-ii'>{icon}</span>
        </div>
        <span className="ic-ip">₹{item.price}</span>
        <div className="ic-sd">

        <ReactStars {...options} /> <span className='ic-ir'>(226 Reviews)</span>
        </div>
        <div className="ic-td">
        </div>
    </Link>
    <div className="ic-fd">

        <button className="ic-bn">Buy Now</button>
        <button className="ic-atc">Add to cart</button>
    </div>
    </div>
  )
}

export default ItemCard
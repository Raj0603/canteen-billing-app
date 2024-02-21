import React from "react";
import vegImg from "../../../assets/iv.png";
import nonVegImg from "../../../assets/inv.png";
import "./MyOrder.css"
import osimg from "../../../assets/osimg.jpg"

const OrderCard = ({ order}) => {

  const timestamp = order.paidAt;
  const formattedDate = new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="oc-mc">
      <div className="oc-uc">
        {/* <img src={osimg} alt="" className="oc-osi" /> */}

        <h3>Status  {order.orderStatus}</h3>
      </div>
      <div className="oc-lc">
        <span style={{color:"#696999"}}>Items</span>

        {order.orderItems.map((item) => (
          <div key={item._id} className="oc-item">
            {item.type === "Veg" ? (
              <img src={vegImg} alt="Veg" />
            ) : (
              <img src={nonVegImg} alt="Non-Veg" />
            )}
            <span className="oc-qnc">
              {item.quantity} X {item.name}
            </span>
            <span>
            ₹{item.quantity*item.price}
            </span>
          </div>
        ))}
        <span className="oc-bl"></span>
        <div className="oc-dpc">
          
        <span style={{color:"#696999"}}>{formattedDate}</span> <span className="oc-tps"> ₹ {order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

import React from "react";
import vegImg from "../../../assets/iv.png";
import nonVegImg from "../../../assets/inv.png";

const OrderCard = ({ order }) => {

  const timestamp = order.paidAt;
  const formattedDate = new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let icon = "";

  if (item.type == "Veg") {
    icon = <img src={vegImg} alt="" />;
  } else {
    icon = <img src={nonVegImg} alt="" />;
  }
  return (
    <div className="oc-mc">
      <div className="oc-uc">
        <span>Status:{order.orderStatus}</span>
      </div>
      <div className="oc-ld">
        <span>Items</span>
        <span>
          {order.orderItems.type} {order.orderItems.quantity} X{" "}
          {order.orderItems.name}
        </span>
        <span>{formattedDate} {order.totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderCard;

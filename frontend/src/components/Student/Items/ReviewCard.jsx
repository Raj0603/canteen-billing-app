import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../../assets/profile.png"

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="rc-mc">
      <img src={profilePng} alt="User" className="rc-img"/>
      <p rc-rn>{review.name}</p>
      <ReactStars {...options} />
      <span className="rc-rc">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
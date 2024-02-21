import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../../assets/profile.png";

const ReviewCard = ({ review }) => {
  const ratingOptions = {
    value: review.rating,
    edit: false,
    precision: 0.5,
  };

  const dateAt = review.dateAt;
  const date = new Date(dateAt);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;

  return (
    <div className="rc-mc">
      <span className="rc-nd">
        <span className="rc-rn">{review.name}</span>
        <span className="rc-rd">{formattedDate}</span>
      </span>
      <ReactStars {...ratingOptions} size={24} />
      <div className="rc-rc"> <span>{review.comment}</span></div>
    </div>
  );
};

export default ReviewCard;

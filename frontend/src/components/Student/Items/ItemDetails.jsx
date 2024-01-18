import "./ItemDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getItemDetails,
  newReview,
} from "../../../actions/itemAction";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loading from "../../Loading/Loading";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../../constants/itemConstant";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { item, loading, error } = useSelector((state) => state.itemDetails);

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "medium",
    value: item.rating,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    // if (item.availability == false) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("itemId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getItemDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="id-mcc">
          <div className="id-mc">
            <div className="id-ld">
              <Carousel className="id-ci">
                {item.images &&
                  item.images.map((item, i) => (
                    <img
                      className="id-im"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="id-rd">
              <div className="id-in">
                <p>Item # {item._id}</p>
                <h1>{item.name}</h1>
              </div>
              <div className="id-id">
                Description: <p>{item.description}</p>
              </div>
              <div className="id-ir">
                <Rating {...options} />
                <span>({item.numOfReviews} Reviews)</span>
              </div>
              <div className="id-ip">
                <h2>{`₹${item.price}`}</h2>
                <div className="id-iq">
                  <div className="id-iqd">
                    <button onClick={decreaseQuantity} className="id-qb">
                      -
                    </button>
                    <input
                      readOnly
                      value={quantity}
                      type="number"
                      className="id-qn"
                    />
                    <button onClick={increaseQuantity} className="id-qb">
                      +
                    </button>
                  </div>
                  <div className="id-bd">
                    <button
                      className="id-b"
                      // disabled={Item.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="id-b"
                      // disabled={Item.Stock < 1 ? true : false}
                      // onClick={addToCartHandler}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {item.reviews && item.reviews[0] ? (
            <div className="reviews">
              {item.reviews &&
                item.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
      )}
    </>
  );
};

export default ItemDetails;

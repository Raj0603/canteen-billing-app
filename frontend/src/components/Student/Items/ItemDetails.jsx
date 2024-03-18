import "./ItemDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getItemDetails,
  newReview,
} from "../../../actions/itemAction";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { ChevronLeft } from "lucide-react";
import Star from "../../../assets/Vector.svg";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { item, loading, error } = useSelector((state) => state.itemDetails);

  const { student } = useSelector((state) => state.student);

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
    window.location.reload();

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
        <>
          {window.innerWidth > 700 ? (
            <div className="id-mcc">
              <div className="id-mc">
                <div className="id-ld">
                  <img className="id-im" src={item.image} alt="sample image" />
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
                      <button onClick={submitReviewToggle} className="id-sr">
                        Give Review
                      </button>
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
                <DialogTitle>Give Review</DialogTitle>
                <DialogContent className="id-sdb">
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
                    item.reviews.map((review) => (
                      <ReviewCard review={review} key={review._id} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
          ) : (
            <div className="id-mmc">
              <Link to="/menu">
                <div className="id-mcn">
                  <ChevronLeft /> <span className="id-hn">{item.name}</span>
                </div>
              </Link>
              <div className="id-idc">
                <img className="id-im" src={item.image} alt="sample image" />

                <span className="id-irc">
                  <span className="id-irs">{item.rating && item.rating.toFixed(1)}</span>{" "}
                  <img src={Star} alt="" className="id-iis" />{" "}
                  <span className="id-inr">{item.numOfReviews}+ Ratings</span>
                </span>

                <span className="id-dc">{item.description}</span>
              </div>

              <div
                className="id-arc"
                {...(item.reviews && item.reviews[0]
                  ? { style: { marginBottom: "0vh" } }
                  : { style: { marginBottom: "17vh" } })}
              >
                <h3>Add a Review</h3>
                <div className="id-ar">
                  <span style={{ fontSize: "larger" }}>
                    {student ? student.name : "Unknown"}
                  </span>
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                    style={{zIndex:"0"}}
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button className="id-rsb" onClick={reviewSubmitHandler}>
                    Submit
                  </button>
                </div>
              </div>

              {item.reviews && item.reviews[0] ? (
                <div className="id-mrc">
                  <span className="id-rls">what people are saying</span>
                  <div className="reviews">
                    {item.reviews &&
                      item.reviews.map((review) => (
                        <ReviewCard review={review} key={review._id} />
                      ))}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="id-atc">
                <div className="id-pad">
                  <span className="id-pns">Rs {item.price}</span>
                  <div className="cic-qty">
                    <button
                     onClick={decreaseQuantity}
                      className="cic-qb"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="cic-qn"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="cic-qb"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="id-abd">
                  <button className="id-atcb" onClick={addToCartHandler}>Add To Cart</button>
                  <button className="id-bnb">Buy Now</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ItemDetails;

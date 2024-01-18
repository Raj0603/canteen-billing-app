import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {itemDetailsReducer, itemsReducer, newReviewReducer} from "./reducers/itemReducer"
import { forgotPasswordReducer, studentProfileReducer, studentReducer } from "./reducers/studentReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
  items: itemsReducer,
  itemDetails: itemDetailsReducer,
  student: studentReducer,
  profile: studentProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
//   orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
//   newProduct: newProductReducer,
//   product: productReducer,
//   allOrders: allOrdersReducer,
//   order: orderReducer,
//   allUsers: allUsersReducer,
//   userDetails: userDetailsReducer,
//   productReviews: productReviewsReducer,
  // review: reviewReducer,
});


let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});

export default store;

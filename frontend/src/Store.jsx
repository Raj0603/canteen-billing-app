import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {itemDetailsReducer, itemsReducer, newReviewReducer} from "./reducers/itemReducer"


const reducer = combineReducers({
  items: itemsReducer,
  itemDetails: itemDetailsReducer,
//   user: userReducer,
//   profile: profileReducer,
//   forgotPassword: forgotPasswordReducer,
//   cart: cartReducer,
//   newOrder: newOrderReducer,
//   myOrders: myOrdersReducer,
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

let initialState={};

// let initialState = {
//   cart: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     shippingInfo: localStorage.getItem("shippingInfo")
//       ? JSON.parse(localStorage.getItem("shippingInfo"))
//       : {},
//   },
// };

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});

export default store;

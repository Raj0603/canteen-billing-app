import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {itemDetailsReducer, itemReviewsReducer, itemsReducer, newReviewReducer, reviewReducer} from "./reducers/itemReducer"
import { allOwnersReducer, allStudentsReducer, forgotPasswordReducer, studentDetailsReducer, studentProfileReducer, studentReducer } from "./reducers/studentReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
  items: itemsReducer,
  itemDetails: itemDetailsReducer,
  student: studentReducer,
  profile: studentProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allStudents: allStudentsReducer,
  studentDetails: studentDetailsReducer,
  allOrders: allOrdersReducer,
  allOwners: allOwnersReducer,
  newReview: newReviewReducer,
  orderDetails: orderDetailsReducer,
  productReviews: itemReviewsReducer,
  review: reviewReducer,
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

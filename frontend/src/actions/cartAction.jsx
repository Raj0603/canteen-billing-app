import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    EMPTY_CART_INFO
  } from "../constants/cartConstant";
  import axios from "axios";
  
  //ADD to cart
  
  export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/item/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        item: data.item._id,
        name: data.item.name,
        price: data.item.price,
        image: data.item.images[0].url,
        type: data.item.type,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  //Empty Cart Items
  
  export const emptyCartItems = () => async (dispatch,) => {
    dispatch({
      type: EMPTY_CART_INFO,
    });
  
    localStorage.removeItem("cartItems");
  };
  
import axios from "axios";

import {
  ALL_ITEM_REQUEST,
  ALL_ITEM_SUCCESS,
  ALL_ITEM_FAIL,
  ADMIN_ITEM_REQUEST,
  ADMIN_ITEM_SUCCESS,
  ADMIN_ITEM_FAIL,
  NEW_ITEM_REQUEST,
  NEW_ITEM_SUCCESS,
  NEW_ITEM_FAIL,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/itemConstant";

// Get all items
export const getItem =
  (keyword = "", rating = 0, category, type, collegeCanteen) =>
  //   (keyword = "", currentPage = 1, price = [0, 25000], category, ratings=0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ITEM_REQUEST });

      //   let link = `/api/v1/items?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      let link = `/api/v1/items?keyword=${keyword}&rating[gte]=${rating}&collegeCanteen=${collegeCanteen}`;

      if (category) {
        link += `&category=${category}`;
      }

      if (type) {
        link += `&type=${type}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ITEM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All items For Admin
export const getAdminItem = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ITEM_REQUEST });

    const { data } = await axios.get("/api/v1/admin/items");

    dispatch({
      type: ADMIN_ITEM_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Item
export const createItem = (itemData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ITEM_REQUEST });

    const config = {
      headers: { "Content-Type": "multiform/form-data" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/item/new`,
      itemData,
      config
    );

    dispatch({
      type: NEW_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Item
export const updateItem = (id, itemData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ITEM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/item/${id}`,
      itemData,
      config
    );

    dispatch({
      type: UPDATE_ITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Item
export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ITEM_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/item/${id}`);

    dispatch({
      type: DELETE_ITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Items Details
export const getItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/item/${id}`);

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data.item,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Item
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Item
export const deleteReviews = (reviewId, itemId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&itemId=${itemId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

import {
    ALL_ITEM_REQUEST,
    ALL_ITEM_FAIL,
    ALL_ITEM_SUCCESS,
    ADMIN_ITEM_REQUEST,
    ADMIN_ITEM_SUCCESS,
    ADMIN_ITEM_FAIL,
    NEW_ITEM_REQUEST,
    NEW_ITEM_SUCCESS,
    NEW_ITEM_FAIL,
    NEW_ITEM_RESET,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    UPDATE_ITEM_RESET,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAIL,
    DELETE_ITEM_RESET,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
  } from "../constants/itemConstant";
  
  export const itemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
      case ALL_ITEM_REQUEST:
      case ADMIN_ITEM_REQUEST:
        return {
          loading: true,
          items: [],
        };
      case ALL_ITEM_SUCCESS:
        return {
          loading: false,
          items: action.payload.items,
          itemsCount: action.payload.itemsCount,
          resultPerPage: action.payload.resultPerPage,
          filteredItemsCount: action.payload.filteredItemsCount,
        };
  
      case ADMIN_ITEM_SUCCESS:
        return {
          loading: false,
          items: action.payload,
        };
      case ALL_ITEM_FAIL:
      case ADMIN_ITEM_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newItemReducer = (state = { item: {} }, action) => {
    switch (action.type) {
      case NEW_ITEM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_ITEM_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          item: action.payload.item,
        };
      case NEW_ITEM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_ITEM_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const itemReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ITEM_REQUEST:
      case UPDATE_ITEM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_ITEM_FAIL:
      case UPDATE_ITEM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_ITEM_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_ITEM_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const itemDetailsReducer = (state = { item: {} }, action) => {
    switch (action.type) {
      case ITEM_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case ITEM_DETAILS_SUCCESS:
        return {
          loading: false,
          item: action.payload,
        };
      case ITEM_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const itemReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
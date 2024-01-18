import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  EMPTY_CART_INFO,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const foodItem = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.item === foodItem.item
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.item === isItemExist.item ? foodItem : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, foodItem],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.item !== action.payload),
      };

    case EMPTY_CART_INFO:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

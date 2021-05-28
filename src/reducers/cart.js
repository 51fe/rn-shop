import * as types from '../actions/actionTypes';
import { getLocalData, saveLocalData } from '../utils';

const initialState = {
  items: [],
  count: 1,
};

/**
 * Add item(s) to cart
 * @param items
 * @param payload
 * @param count
 * @param many
 */
const addToCart = (items, payload, count) => {
  const found = items.find(item => {
    return item._id === payload._id;
  });
  // add
  if (!found) {
    items.unshift({ ...payload, quantity: count });
  } else {
    // update
    found.quantity += count;
  }
  saveLocalData(items);
  return items;
};

export default function cart(state = initialState, action) {
  let items = [];
  switch (action.type) {
    case types.GET_ALL_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.data,
      };
    case types.ADD_CART_ITEMS:
      return {
        ...state,
        items: addToCart(action.items, action.item, state.count),
      };

    case types.ADD_CART_ITEM:
      return {
        ...state,
        items: addToCart(action.items, action.item, 1),
      };

    case types.REMOVE_CART_ITEM:
      // Called when removing one item from cart
      items = action.items.filter(item => item._id !== action.id);
      saveLocalData(items);
      return {
        ...state,
        items,
      };

    /**
     * update cart item count
     * @param state
     * @param item
     */
    case types.UPDATE_CART_ITEM:
      const payload = action.item;
      items = action.items.map(item =>
        item._id === payload.id
          ? {
              ...item,
              quantity: payload.count,
            }
          : item,
      );
      saveLocalData(items);
      return {
        ...state,
        items,
      };

    /**
     * Changing count to prepare to update cart
     * @param state
     * @param count
     */
    case types.WILL_UPDATE_CART_ITEM:
      // Changing count to prepare to update cart
      return {
        ...state,
        count: action.count,
      };

    default:
      return state;
  }
}

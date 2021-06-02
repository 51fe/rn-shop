import * as types from '../actions/actionTypes';
import localStorage from '../utils/localStorage';

const initialState = {
  items: [],
  count: 1,
};

/**
 * Add item(s) to cart
 * @param items
 * @param payload
 * @param count
 */
const addToCart = (state, data, many = false) => {
  let items = [];
  if (Array.isArray(state.items)) {
    items = [];
  }
  const found = items.find(item => {
    return item._id === data._id;
  });
  const count = many ? state.count : 1;
  // add
  if (!found) {
    items.unshift({ ...data, quantity: count });
  } else {
    // update
    found.quantity += count;
  }
  localStorage.setItem(items);
  return items;
};

const cart = (state = initialState, action) => {
  let items = [];
  switch (action.type) {
    case types.LOAD_CART_ITEMS:
    case types.SAVE_CART_ITEMS:
      items = action.items;
      return {
        ...state,
        items,
      };

    case types.ADD_CART_ITEMS:
      return {
        ...state,
        items: addToCart(state, action.item, true),
      };

    case types.ADD_CART_ITEM:
      return {
        ...state,
        items: addToCart(state, action.item),
      };

    case types.REMOVE_CART_ITEM:
      // Called when removing one item from cart
      items = state.items.filter(item => item._id !== action.id);
      localStorage.setItem(items);
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
      items = state.items.map(item =>
        item._id === payload.id
          ? {
              ...item,
              quantity: payload.count,
            }
          : item,
      );
      localStorage.setItem(items);
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
};

export default cart;

export const getAllItems = state => state.cart.items || [];

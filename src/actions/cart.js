import * as types from './actionTypes';

export const addCartItems = item => ({
  type: types.ADD_CART_ITEMS,
  item,
});

export const addCartItem = item => ({
  type: types.ADD_CART_ITEM,
  item,
});

export const removeCartItem = id => ({
  type: types.REMOVE_CART_ITEM,
  id,
});

export const updateCartItem = item => ({
  type: types.UPDATE_CART_ITEM,
  item,
});

export const willUpdateItem = count => ({
  type: types.WILL_UPDATE_CART_ITEM,
  count,
});

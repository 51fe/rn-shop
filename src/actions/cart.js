import * as types from './actionTypes';
import { getLocalData } from '../utils';

export const getAllCartItems = () => async dispatch => {
  const data = await getLocalData();
  await dispatch({
    type: types.GET_ALL_CART_ITEMS_SUCCESS,
    data,
  });
};

export const addCartItems = item => async dispatch => {
  const data = await getLocalData();
  await dispatch({
    type: types.ADD_CART_ITEMS,
    items: data,
    item,
  });
};

export const addCartItem = item => async dispatch => {
  const data = await getLocalData();
  await dispatch({
    type: types.ADD_CART_ITEM,
    items: data,
    item,
  });
};

export const removeCartItem = id => async dispatch => {
  const data = await getLocalData();
  await dispatch({
    type: types.REMOVE_CART_ITEM,
    items: data,
    id,
  });
};

export const updateCartItem = item => async dispatch => {
  const data = await getLocalData();
  await dispatch({
    type: types.UPDATE_CART_ITEM,
    items: data,
    item,
  });
};

export const willUpdateItem = count => ({
  type: types.WILL_UPDATE_CART_ITEM,
  count,
});

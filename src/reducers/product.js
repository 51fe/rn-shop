import * as types from '../actions/actionTypes';

export default (state = { quantity: 1 }, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_BY_ID_SUCCESS:
      if (action.data) {
        return {
          ...state,
          ...action.data,
        };
      }
      return state;
    default:
      return state;
  }
};

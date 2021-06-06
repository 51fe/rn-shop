import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import products from './products';
import product from './product';
import cart from './cart';
import status from './status';

const persistConfig = {
  key: 'RN_CART_ITEMS',
  storage: AsyncStorage,
  whitelist: ['items'],
};

export default combineReducers({
  products,
  product,
  cart: persistReducer(persistConfig, cart),
  status,
});

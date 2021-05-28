import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * get Cart Items Count
 * @param items
 * @returns {number}
 */
export const getCartItemsCount = items => {
  let total = 0;
  items.forEach(item => {
    total += Number(item.quantity);
  });
  return total;
};
/**
 * get sum price
 * @param state
 * @returns {*}
 */
export const getCartPriceSum = state =>
  state.cart.items.reduce(
    (total, item) => total + parseFloat(item.price) * parseInt(item.quantity),
    0,
  );

/**
 * get item quantity put in the car
 * @param id
 * @returns {Number}
 */
export const getAddedQuantity = async id => {
  try {
    const items = await getLocalData();
    const found = items.find(item => item._id === id);
    if (found) {
      return Number(found.quantity);
    }
  } catch (error) {
    // console.log(error);
  }
  return 0;
};

export const getLocalData = async () => {
  try {
    const value = await AsyncStorage.getItem('RN_CART_ITEMS');
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const saveLocalData = async items => {
  try {
    const value = JSON.stringify(items);
    await AsyncStorage.setItem('RN_CART_ITEMS', value);
  } catch (error) {
    // console.log(error);
  }
};

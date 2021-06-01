import localStorage from './localStorage';

/**
 * get Cart Items Count
 * @param items
 * @returns {number}
 */
export const getCartItemsCount = items => {
  let total = 0;
  items.forEach(item => {
    total += parseInt(item.quantity, 10);
  });
  return total;
};
/**
 * get sum price
 * @param state
 * @returns {*}
 */
export const getCartPriceSum = items =>
  items.reduce(
    (total, item) =>
      total + parseFloat(item.price) * parseInt(item.quantity, 10),
    0,
  );

/**
 * get item quantity put in the car
 * @param id
 * @returns {Number}
 */
export const getAddedQuantity = async id => {
  try {
    const items = await localStorage.getItem();
    const found = items.find(item => item._id === id);
    if (found) {
      return Number(found.quantity);
    }
  } catch (error) {
    // console.log(error);
  }
  return 0;
};

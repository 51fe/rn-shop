import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
  async setItem(key = 'RN_CART_ITEMS', value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  },
  async getItem(key = 'RN_CART_ITEMS') {
    return await AsyncStorage.getItem(key).then(result => {
      if (result) {
        try {
          result = JSON.parse(result);
        } catch (e) {
          // console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
        }
      }
      return result;
    });
  },
  async removeItem(key = 'RN_CART_ITEMS') {
    return await AsyncStorage.removeItem(key);
  },
};

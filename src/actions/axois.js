import axios from 'axios';
import { Alert } from 'react-native';

// axios gloable setting
axios.defaults.timeout = 20000;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/v1'
    : 'https://shop-01qa.onrender.com/v1';

// http response interceptor
axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    const msg = error.toString();
    Alert.alert('消息', msg, [{ text: '确认', onPress: () => {} }]);
    return Promise.reject(error);
  },
);

export default axios;

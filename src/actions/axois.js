import axios from 'axios';
import { ToastAndroid } from 'react-native';

// axios gloable setting
axios.defaults.timeout = 20000;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://riafan-api.herokuapp.com/v1'
    : 'https://riafan-api.herokuapp.com/v1';

// http response interceptor
axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    const msg = error.toString();
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    return Promise.reject(error);
  },
);

export default axios;

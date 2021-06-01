import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const middleware = [thunk];

// 给增强后的store传入reducer
const store = createStore(reducers, applyMiddleware(...middleware));

export default store;

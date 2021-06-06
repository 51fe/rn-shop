import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducers from './reducers/index';

export const store = createStore(reducers, applyMiddleware(thunk));
export const persisted = persistStore(store);

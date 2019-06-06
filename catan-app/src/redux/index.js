import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './modules';
const middleware = [thunk];

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
window.store = store;


export default store;
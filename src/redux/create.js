import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

const composeFunc = require('redux-devtools-extension').composeWithDevTools;

export default (state = {}) => {
    return createStore(reducers, state, composeFunc());
};

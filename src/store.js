import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import productsReducer from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const initialState ={};

//send all information from redux store to chrome
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
    products: productsReducer,
    cart: cartReducer
}),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  ProductListReducer,
  ProductDetailsReducer,
} from './reducers/productReducer'

import { cartReducer } from './reducers/cartReducers'

const reducers = combineReducers({
  ProductList: ProductListReducer,
  ProductDetails: ProductDetailsReducer,
  cart: cartReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cart: { cartItems: cartItemFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

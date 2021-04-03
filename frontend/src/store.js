import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ProductListReducer, ProductDetailsReducer } from './reducers/productReducer'

const reducers = combineReducers({
  ProductList: ProductListReducer,
  ProductDetails: ProductDetailsReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

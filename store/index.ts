import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise'
import storeData from '@/store/reducers'

const reducers = combineReducers({
  storeData
})

const store: any = createStore(reducers, applyMiddleware(promiseMiddleware))

export default store

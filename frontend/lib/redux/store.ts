import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as resourceReducer } from './resource'
import { reducer as uiReducer } from './ui'

export const initializeStore = () => {
  const rootReducer = combineReducers({
    ui: uiReducer,
    resource: resourceReducer
  })

  return createStore(rootReducer, composeWithDevTools(applyMiddleware()))
}

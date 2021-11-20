import {createStore, combineReducers, applyMiddleware} from 'redux'

import reducers from './reducers'

const combinedReducers = combineReducers(reducers)

export type RootState = ReturnType<typeof combinedReducers>

const promiseStore = async () => {
  const persistedState: Record<string, any> = await new Promise(resolve => {
    chrome.storage.sync.get(null, chromePersistentState => {
      resolve(chromePersistentState)
    })
  })

  const saveDataToChromeStorage = store => next => action => {
    const result = next(action)
    chrome.storage.sync.set(store.getState())
    return result
  }

  return createStore(
    combinedReducers,
    persistedState,
    applyMiddleware(saveDataToChromeStorage)
  )
}

export const store = promiseStore()

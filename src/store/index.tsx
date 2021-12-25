import {createStore, combineReducers, applyMiddleware, Store} from 'redux'

import reducers from './reducers'

const combinedReducers = combineReducers(reducers)

export type RootState = ReturnType<typeof combinedReducers>

export const persistedState: () => Record<string, any> = async () => {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, chromePersistentState => {
      resolve(chromePersistentState)
    })
  })
}

export const promiseStore: () => Promise<Store> = async () => {
  const persisted = await persistedState()
  const saveDataToChromeStorage = store => next => action => {
    const result = next(action)
    chrome.storage.sync.set(store.getState())
    return result
  }

  return createStore(
    combinedReducers,
    persisted,
    applyMiddleware(saveDataToChromeStorage)
  )
}

export const store = promiseStore()

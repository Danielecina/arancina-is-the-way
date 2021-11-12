import {useState, useEffect, useCallback} from "react"
import {distinctUntilKeyChanged, pluck} from 'rxjs/operators'
import {BehaviorSubject, Subscription, Observable} from 'rxjs'

import reducers from "./reducers"

export interface Action {
  type: string | undefined;
  payload?: any;
}
export type State = Record<string, any>
export type Reducer = (state: State | undefined, action: Action) => Record<string, any>
export type Reducers = Record<string, Reducer>
export type Dispatch =  (action: Action) => void
export interface StoreClass {
  select: (key: string) => void
  subscribe: (callback: (state: State) => void) => Subscription
  dispatch: Dispatch
}

export const setDefaultsFromReducers = (persistedState): Reducers => {
  return Object.entries(reducers).reduce((acc, [key, reducer]) => {
    return {
      ...acc,
      [key]: {
        ...reducer(undefined, {type: undefined}),
        ...persistedState[key]
      }
    }
  }, {})
}

class Store implements StoreClass {
  private state: BehaviorSubject<State>
  private reducers: Reducers
  
  constructor(reducers, persistedState= {}) {
    this.reducers = reducers
    this.state = new BehaviorSubject(setDefaultsFromReducers(persistedState))
  }

  select = (key: string): Observable<unknown> => {
    return this.state.pipe(
      distinctUntilKeyChanged(key),
      pluck(key)
    )
  }

  subscribe = (callback: (state: State) => void): Subscription => {
    return this.state.subscribe(state => {
      callback(state)
    })
  }

  dispatch = (action: Action): void => {
    console.log('dispatch action', action)
    const oldState = this.state.getValue()
    const newState = Object.entries(this.reducers)
      .reduce((acc, [key, reducer]) => {
        return {
          ...acc,
          [key]: reducer(oldState[key], action)
        }
      }, {})

    console.log('store dispatch', newState)
    chrome.storage.sync.set(newState, () => {
      this.state.next(newState)
    })
  }

  // asyncDispatch = async (
  //   type: string,
  //   dispatcher: (state: State) => Promise<State>
  // ): Promise<void> => {
  //   const payload = await dispatcher(this.state.getValue())
  //   this.dispatch({type, payload})
  // }
}

export interface UseStoreState {
  storeState: State,
  dispatch: (action: Action) => void
}

export function useStore (): UseStoreState {
  const [internalStoreState, setInternalStoreState] = useState<State>({})
  const [storeInstance, setStoreInstance] = useState<StoreClass | null>(null)

  useEffect(() => {
    chrome.storage.sync.get(null, chromePersistentState => {
      console.log('chromePersistentState', chromePersistentState)
      const storeInstance = new Store(reducers, chromePersistentState)
      setStoreInstance(storeInstance)
    })
  }, [])
  
  useEffect(() => {
    if (!storeInstance) return
    const storeStateSubscription = storeInstance.subscribe(state => {
      setInternalStoreState(state)
    })
    return () => storeStateSubscription.unsubscribe()
  }, [storeInstance])
  
  const dispatchNewStoreState = useCallback((action: Action) => {
    if (!storeInstance) return
    storeInstance.dispatch(action)
  }, [storeInstance])
  
  return {
    storeState: internalStoreState,
    dispatch: dispatchNewStoreState
  }
}


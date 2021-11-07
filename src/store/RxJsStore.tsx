import {useState, useEffect, useCallback} from "react"
import {distinctUntilKeyChanged, pluck} from 'rxjs/operators'
import {BehaviorSubject, Subscription, Observable} from 'rxjs'

import reducers from "./reducers";
import {getCurrentTabUId, sendMessage} from "../lib/chromeUtils"
import {ChromeMessage, Sender} from "../types";

export interface Action {
  type: string;
  payload?: any;
}
export type State = Record<string, any>
export type Reducer = (state: State, action: Action) => Record<string, any>
export type Reducers = Record<string, Reducer>
export type Dispatch =  (action: Action) => void
export interface StoreClass {
  select: (key: string) => void
  subscribe: (callback: (state: State) => void) => Subscription
  dispatch: Dispatch
}

export const START_UP_STORE = 'START_UP_STORE'

export default class Store implements StoreClass {
  private state: BehaviorSubject<State>
  private reducers: Reducers
  
  constructor(
    reducers: Reducers,
    initialState= {},
  ) {
    this.state = new BehaviorSubject(initialState)
    this.reducers = reducers
  }

  select = (key: string): Observable<unknown> => {
    return this.state.pipe(
      distinctUntilKeyChanged(key),
      pluck(key)
    )
  }

  subscribe = (callback: (state: State) => void): Subscription => {
    return this.state.subscribe(state => {
      console.log('[SUBSCRIBE TRIGGER]', state)
      callback(state)
    })
  }

  dispatch = (action: Action): void => {
    const oldState = this.state.getValue()
    const newState = Object.entries(this.reducers)
      .reduce((acc, [key, reducer]) => {
        return {
          ...acc,
          [key]: reducer(oldState[key], action)
        }
      }, {})

    chrome.storage.sync.set(newState, () => {
      console.log('[NEW STORE SAVED]', newState)
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
      console.log('[SET CHROME STATE]', chromePersistentState)
      const storeInstance = new Store(reducers, chromePersistentState)
      console.log('[SET NEW STORE INSTANCE]', storeInstance)
      setStoreInstance(storeInstance)
    })
  }, [])
  
  useEffect(() => {
    if (!storeInstance) return
    const storeStateSubscription = storeInstance.subscribe(state => {
      console.log('[AFTER DISPATCH SET NEW DATA]', state)
      setInternalStoreState(state)
    })
    return () => storeStateSubscription.unsubscribe()
  }, [storeInstance])
  
  useEffect(() => {
    if (!storeInstance) return
    console.log('[SEND MESSAGE TO OTHER FILES', storeInstance)
    const message: ChromeMessage = {type: 'A_CASO', from: Sender.REACT}
    sendMessage(message, (data) => {
      console.log('[sendRuntimeMessage response callback]', data)
    })
  }, [storeInstance])
  
  const dispatchNewStoreState = useCallback((action: Action) => {
    if (!storeInstance) return
    console.log('[DISPATCH ACTION]', action)
    storeInstance.dispatch(action)
  }, [storeInstance])
  
  return {
    storeState: internalStoreState,
    dispatch: dispatchNewStoreState
  }
}


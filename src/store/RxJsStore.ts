import {distinctUntilKeyChanged, pluck} from 'rxjs/operators'
import {BehaviorSubject, Subscription, Observable} from 'rxjs'

export interface Action {
  type: string;
  payload?: any;
}
export type State = Record<string, any>
export type Reducer = (state: State, action: Action) => void
export type Reducers = Record<string, Reducer>
export interface StoreClass {
  select: (key: string) => void
  subscribe: (callback: (state: State) => void) => Subscription
  dispatch: (action: Action) => void
}

export const START_UP_STORE = 'START_UP_STORE'

export default class Store implements StoreClass {
  private state: State
  private reducers: Reducers
  
  constructor(
    reducers: Reducers,
    initialState: BehaviorSubject<State> = {},
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
    return this.state.subscribe(callback)
  }

  dispatch = (action: Action): void => {
    const oldState = this.state.getValue()
    const newState = Object.entries(this.reducers).reduce((acc, [key, reducer]) => {
      return {...acc, [key]: reducer(oldState[key], action)}
    }, {})
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


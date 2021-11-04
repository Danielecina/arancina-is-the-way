// import {distinctUntilKeyChanged, pluck} from 'rxjs/operators'
import {BehaviorSubject} from 'rxjs'
console.log('BehaviorSubject', BehaviorSubject)

export interface Action {
  type: string;
  payload?: any;
}
export type State = Record<string, any>
export type Reducer = (state: State, action: Action) => void
export type Reducers = Record<string, Reducer>

export default class Store {
  private state: State
  private reducers: Reducers
  private chromeStore
  
  constructor(
    reducers: Reducers,
    initialState: State = {},
    chromeStore: chrome.storage.SyncStorageArea
  ) {
    console.log('inizialize store class')
    // @ts-ignore
    this.state = initialState
    this.reducers = reducers
    this.chromeStore = chromeStore
  }
  //
  // select = (key: string): Observable<unknown> => {
  //   return this.state.pipe(
  //     distinctUntilKeyChanged(key),
  //     pluck(key)
  //   )
  // }
  //
  // subscribe = (callback: (state: State) => void): Subscription => {
  //   return this.state.subscribe(callback)
  // }
  //
  // dispatch = (action: Action): void => {
  //   const oldState = this.state.getValue()
  //   const newState = Object.entries(this.reducers).reduce((acc, [key, reducer]) => {
  //     return {...acc, [key]: reducer(oldState[key], action)}
  //   }, {})
  //   this.chromeStore.set(newState, () => {
  //     this.state.next(newState)
  //   })
  // }
  //
  // asyncDispatch = async (
  //   type: string,
  //   dispatcher: (state: State) => Promise<State>
  // ): Promise<void> => {
  //   const payload = await dispatcher(this.state.getValue())
  //   this.dispatch({type, payload})
  // }
}

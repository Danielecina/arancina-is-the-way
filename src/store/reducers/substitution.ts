import {Reducer, Action} from "../RxJsStore"
import {SUBSTITUTE_WORDS, TOGGLE_SUBSTITUTE_WATCH_MODE} from '../actions/substitution'

const initialState = {
  watchMode: false
}

const substitution: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SUBSTITUTE_WORDS: {
      return state
    }
    case TOGGLE_SUBSTITUTE_WATCH_MODE: {
      const {payload} = action
      console.log('TOGGLE_SUBSTITUTE_WATCH_MODE', payload)
      
      return {
        ...state,
        watchMode: payload.watchMode
      }
    }
    default: {
      return state
    }
  }
}

export default substitution

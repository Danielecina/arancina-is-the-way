import {Reducer, Action} from "../RxJsStore"
import {SUBSTITUTE_WORDS, TOGGLE_WATCH_MODE} from "../actions/substitution";

const initialState = {
  countOfWrongWordsFound: 0
}

const trophies: Reducer = (state = initialState, {type, payload}: Action) => {
  switch (type) {
    case TOGGLE_WATCH_MODE:
    case SUBSTITUTE_WORDS: {
      const {errorsCount} = payload
      console.log('trophies reducer payload', payload, initialState)
      return {
        ...state,
        countOfWrongWordsFound: state.countOfWrongWordsFound + errorsCount,
      }
    }
    default: {
      return state
    }
  }
}

export default trophies

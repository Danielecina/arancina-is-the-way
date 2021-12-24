import {SUBSTITUTE_WORDS, TOGGLE_WATCH_MODE} from '../../actions/substitution'

export interface SubstitutionReducer {
  watchMode?: boolean
}

export const initialState = {
  watchMode: false
}

const substitution = (
  state: SubstitutionReducer = initialState,
  {type, payload} : {type: string, payload?: any}
): SubstitutionReducer => {
  switch (type) {
    case SUBSTITUTE_WORDS: {
      return state
    }
    case TOGGLE_WATCH_MODE: {
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

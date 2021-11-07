import {Sender} from "../../types"
import {getCurrentTabUId} from "../../lib/chromeUtils"

export const SUBSTITUTE_WORDS: string = 'SUBSTITUTE_WORDS'
export const substituteWords = () => {
  return {
    type: SUBSTITUTE_WORDS
  }
}

export const TOGGLE_WATCH_MODE: string = 'TOGGLE_WATCH_MODE'
export const toggleWatchModeMessage = (watchMode: boolean) => {
  return {
    type: TOGGLE_WATCH_MODE,
    payload: {
      watchMode
    }
  }
}

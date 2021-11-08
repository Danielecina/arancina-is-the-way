import {sendMessage} from '../../lib/chromeUtils'
import {Sender} from "../../types"

export const SUBSTITUTE_WORDS: string = 'SUBSTITUTE_WORDS'
export const substituteWords = () => {
  sendMessage({
    type: SUBSTITUTE_WORDS,
    from: Sender.REACT
  })
  return {
    type: SUBSTITUTE_WORDS
  }
}

export const TOGGLE_WATCH_MODE: string = 'TOGGLE_WATCH_MODE'
export const toggleWatchModeMessage = (watchMode: boolean) => {
  sendMessage({
    type: TOGGLE_WATCH_MODE,
    from: Sender.REACT
  })
  return {
    type: TOGGLE_WATCH_MODE,
    payload: {watchMode}
  }
}

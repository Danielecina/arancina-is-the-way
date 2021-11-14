import {sendMessage} from '../../../lib/chromeUtils'

export const SUBSTITUTE_WORDS: string = 'SUBSTITUTE_WORDS'
export const substituteWords = async () => {
  await sendMessage({type: SUBSTITUTE_WORDS})
  return {
    type: SUBSTITUTE_WORDS
  }
}

export const TOGGLE_WATCH_MODE: string = 'TOGGLE_WATCH_MODE'
export const toggleWatchModeMessage = async (watchMode: boolean) => {
  await sendMessage({type: TOGGLE_WATCH_MODE, payload: {watchMode}})
  return {
    type: TOGGLE_WATCH_MODE,
    payload: {watchMode}
  }
}

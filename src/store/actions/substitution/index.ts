import {sendMessage} from '../../../lib/chromeUtils'

type substituteWordsType = () => Promise<{type: string}>

export const SUBSTITUTE_WORDS: string = 'SUBSTITUTE_WORDS'
export const substituteWords: substituteWordsType = async () => {
  await sendMessage({type: SUBSTITUTE_WORDS})
  return {
    type: SUBSTITUTE_WORDS
  }
}

type toggleWatchModeMessageType = (watchMode: boolean) => Promise<{type: string, payload: Record<string, unknown>}>

export const TOGGLE_WATCH_MODE: string = 'TOGGLE_WATCH_MODE'
export const toggleWatchModeMessage: toggleWatchModeMessageType = async (watchMode) => {
  await sendMessage({type: TOGGLE_WATCH_MODE, payload: {watchMode}})
  return {
    type: TOGGLE_WATCH_MODE,
    payload: {watchMode}
  }
}

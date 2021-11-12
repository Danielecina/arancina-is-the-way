import {sendMessage} from '../../lib/chromeUtils'
// import {INCREASE_ERROR_WORD_COUNT} from './trophies'

export const SUBSTITUTE_WORDS: string = 'SUBSTITUTE_WORDS'
export const substituteWords = async () => {
  const {payload} = await sendMessage({type: SUBSTITUTE_WORDS})
  
  return {
    type: SUBSTITUTE_WORDS,
    payload: {errorsCount: payload.errorsCount}
  }
}

export const TOGGLE_WATCH_MODE: string = 'TOGGLE_WATCH_MODE'
export const toggleWatchModeMessage = async (watchMode: boolean) => {
  const {payload} = await sendMessage({type: TOGGLE_WATCH_MODE})
  return {
    type: TOGGLE_WATCH_MODE,
    payload: {watchMode, errorsCount: payload.errorsCount}
  }
}

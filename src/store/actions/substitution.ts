

export const SUBSTITUTE_WORDS: string = 'SUBSTITUTE_WORDS'
export const substituteWords = () => {
  return {
    type: SUBSTITUTE_WORDS
  }
}

export const TOGGLE_SUBSTITUTE_WATCH_MODE: string = 'TOGGLE_SUBSTITUTE_WATCH_MODE'
export const toggleWatchModeMessage = (
  {watchMode}: {watchMode: boolean}
) => {
  
  return {
    type: TOGGLE_SUBSTITUTE_WATCH_MODE,
    payload: {
      watchMode
    }
  }
}

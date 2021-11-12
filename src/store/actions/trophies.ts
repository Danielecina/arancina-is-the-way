export const INCREASE_ERROR_WORD_COUNT = 'INCREASE_ERROR_WORD_COUNT'
export const countOfWrongWordsFound = (count: number) => {
  return {
    type: INCREASE_ERROR_WORD_COUNT,
    payload: {
      count
    }
  }
}

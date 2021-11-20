import * as chromeUtils from '../../../../lib/chromeUtils'
import {
  SUBSTITUTE_WORDS, substituteWords,
  TOGGLE_WATCH_MODE, toggleWatchModeMessage
} from '..'

jest.spyOn(chromeUtils, 'sendMessage').mockImplementation(() => Promise.resolve())

describe('substituteWords action', () => {
  test('expect to return correct substituteWords action', async () => {
    const action = await substituteWords()

    expect(action).toEqual({
      type: SUBSTITUTE_WORDS
    })
  })

  test('expect to return correct toggleWatchModeMessage action', async () => {
    const action = await toggleWatchModeMessage(true)

    expect(action).toEqual({
      type: TOGGLE_WATCH_MODE,
      payload: {watchMode: true}
    })
  })
})

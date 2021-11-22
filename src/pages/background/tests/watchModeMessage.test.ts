import * as chromeUtils from '../../../lib/chromeUtils'
import watchModeMessage from '../watchModeMessage'
import {ChromeMessage} from '../../../types'

jest.spyOn(chromeUtils, 'sendMessage').mockImplementation(
  (message): Promise<ChromeMessage> => {
    return Promise.resolve({type: 'TYPE', message: 'mocked message'})
  }
)

describe('watchModeMessage', () => {
  test('expect to NOT call sendMessage', async () => {
    await watchModeMessage({substitution: {watchMode: true}})
    expect(chromeUtils.sendMessage).toHaveBeenCalledTimes(1)
    expect(chromeUtils.sendMessage).toHaveBeenCalledWith({
      payload: {watchMode: true},
      type: 'TOGGLE_WATCH_MODE'
    })
  })

  test('expect to NOT call sendMessage', async () => {
    await watchModeMessage({})
    expect(chromeUtils.sendMessage).toHaveBeenCalledTimes(0)
  })
})

import {chrome} from 'jest-chrome'

import {
  getCurrentTabUId,
  sendMessage
} from '../chromeUtils'

describe('getCurrentTabUId', () => {
  test('expect to return correct tabId', async () => {
    // mocked in setup tests
    const tabId = await getCurrentTabUId()
    expect(tabId).toEqual(1)
  })
})

describe('sendMessage', () => {
  test('expect to return correct response', async () => {
    chrome.tabs.sendMessage.mockImplementation(
      (tabId, message, options, callback: any) => {
        callback({payload: {errorsCount: 10}, message: 'fix words completed'})
      }
    )

    const ret = await sendMessage({type: 'TYPE'})
    expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(1)
    expect(ret).toEqual({
      message: 'fix words completed',
      payload: {
        errorsCount: 10
      }
    })
  })
})

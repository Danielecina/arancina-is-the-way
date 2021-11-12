import {chrome} from 'jest-chrome'

import {
  getCurrentTabUId,
  sendMessage
} from '../chromeUtils'

describe('getCurrentTabUId', () => {
  test('expect to return correct tabId', async () => {
    // @ts-ignore
    chrome.tabs.query.mockImplementation((_) => ([{id: 1}]))
    const tabId = await getCurrentTabUId()
    expect(chrome.tabs.query).toHaveBeenCalledTimes(1)
    expect(tabId).toEqual(1)
  })
})

describe('sendMessage', () => {
  test('expect to return correct response', async () => {
    // @ts-ignore
    chrome.tabs.query.mockImplementation((_) => ([{id: 1}]))
    chrome.tabs.sendMessage.mockImplementation(
      (tabId, message, options, callback: any) => {
        callback({payload: {errorsCount: 10}, message: 'fix words completed'})
      },
    )
    
    const ret = await sendMessage({type: 'TYPE'})
    expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(1)
    expect(ret).toEqual({
      message: 'fix words completed',
      payload: {
        errorsCount: 10,
      }
    })
  })
})

import {chrome} from 'jest-chrome'

import {
  createNewTab,
  getCurrentTabUId,
  sendMessage
} from '../chromeUtils'

describe('getCurrentTabUId', () => {
  test('expect to return correct tabId', async () => {
    // mocked in setup tests
    const tabId = await getCurrentTabUId()
    expect(tabId).toEqual(11)
  })
})

describe('sendMessage', () => {
  test('expect to return correct response', async () => {
    chrome.tabs.sendMessage.mockImplementation(
      (tabId, message, options, callback: any) => {
        callback({message: 'fix words completed'})
      }
    )

    const ret = await sendMessage({type: 'TYPE'})
    expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(1)
    expect(ret).toEqual({message: 'fix words completed'})
  })
})

describe('createNewTab', () => {
  test('expect to return correct response', async () => {
    chrome.tabs.create.mockImplementation(({url}, callback: any) => {
      callback()
    })

    await createNewTab('example.com')
    expect(chrome.tabs.create).toHaveBeenCalledTimes(1)
    expect(chrome.tabs.create).toHaveBeenCalledWith({url: 'example.com'}, expect.any(Function))
  })
})

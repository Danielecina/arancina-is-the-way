import {chrome} from 'jest-chrome'

import {promiseStore} from '..'

describe('store', () => {
  test('expect to return correct store', async () => {
    chrome.storage.sync.get.mockImplementation((key, resolveCallback) => {
      resolveCallback({})
    })

    const store = await promiseStore()
    expect(store.getState()).toMatchSnapshot()
  })

  test('expect to correct saving data to chrome storage', async () => {
    chrome.storage.sync.get.mockImplementation((key, resolveCallback) => {
      resolveCallback({substitution: {watchMode: true}})
    })

    const dataSendToChromeStorage = jest.fn()
    chrome.storage.sync.set.mockImplementation(dataSendToChromeStorage)

    const store = await promiseStore()
    store.dispatch({type: 'TOGGLE_WATCH_MODE', payload: {watchMode: false}})

    expect(store.getState()).toEqual({
      ...store.getState(),
      substitution: {watchMode: false}
    })
    expect(dataSendToChromeStorage).toHaveBeenCalledWith({
      ...store.getState(),
      substitution: {watchMode: false}
    })
  })
})

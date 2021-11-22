import {chrome} from 'jest-chrome'

import {promiseStore} from '..'

describe('store', () => {
  test('expect to return correct store', async () => {
    chrome.storage.sync.get.mockImplementation((key, callback) => {
      callback({substitution: {watchMode: true}})
    })

    const store = await promiseStore()
    expect(store.getState()).toEqual({substitution: {watchMode: true}})
  })

  test('expect to correct saving data to chrome storage', async () => {
    chrome.storage.sync.get.mockImplementation((key, callback) => {
      callback({substitution: {watchMode: true}})
    })

    const dataSendToChromeStorage = jest.fn()
    chrome.storage.sync.set.mockImplementation(dataSendToChromeStorage)

    const store = await promiseStore()
    expect(store.getState()).toEqual({substitution: {watchMode: true}})
    store.dispatch({type: 'TOGGLE_WATCH_MODE', payload: {watchMode: false}})

    expect(store.getState()).toEqual({substitution: {watchMode: false}})
    expect(dataSendToChromeStorage).toHaveBeenCalledWith({substitution: {watchMode: false}})
  })
})

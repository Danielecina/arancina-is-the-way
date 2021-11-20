import React from 'react'

import mutationObserver, {listener} from '../mutationObserver'
import * as algorithm from '../algorithm'
import * as chromeUtils from '../chromeUtils'

jest.spyOn(chromeUtils, 'getCurrentTabUId').mockImplementation(() => Promise.resolve(1))

const mockedAlgorithmResult = jest.fn(() => Promise.resolve({}))
jest.spyOn(algorithm, 'default').mockImplementation(mockedAlgorithmResult)

describe('mutationObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    listener && listener.disconnect()
  })

  test('expect to register listener correctly', async () => {
    expect(listener).toBeFalsy()
    await mutationObserver(true)
    expect(listener).toBeTruthy()
  })
})

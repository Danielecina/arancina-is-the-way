import React from 'react'

import mutationObserver, {listener} from '../mutationObserver'
import * as algorithm from '../algorithm'
import * as chromeUtils from "../chromeUtils"
import wordListToRewrite from "../wordListToRewrite"

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
  
  test('expect to execute algorithm when DOM change', async () => {
    const node = document.createElement('div')
    await mutationObserver(true, node)
  
    expect(listener).toBeTruthy()
    const child = document.createElement('div')
    child.textContent = wordListToRewrite[0].wrongWord
    
    node.appendChild(child)
    expect(node).toMatchSnapshot()
    expect(mockedAlgorithmResult).toHaveBeenCalledWith()
  })
})

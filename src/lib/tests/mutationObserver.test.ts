import * as wordReplacerAlgorithm from '../algorithm'
import mutationObserver, {
  listener,
  mutationRecords,
  createListener,
  unsubscribeListener
} from '../mutationObserver'

describe('mutationObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    unsubscribeListener()
  })

  test('expect to register listener correctly', async () => {
    expect(listener).toEqual(undefined)
    await mutationObserver(true)
    expect(listener).toBeInstanceOf(MutationObserver)
  })

  test('expect to deregister listener correctly', async () => {
    expect(listener).toEqual(undefined)
    await mutationObserver(true)
    expect(listener).toBeInstanceOf(MutationObserver)
    await mutationObserver(false)
    expect(listener).toEqual(undefined)
  })

  test('expect to fix words correctly', async () => {
    const body = document.createElement('body')
    const node = document.createElement('div')
    body.appendChild(node)

    const child = document.createElement('div')
    child.textContent = 'arancino'
    node.appendChild(child)

    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })

    await mutationObserver(true)
    expect(child.textContent).toBe('arancina')
  })
})

describe('mutationRecords', () => {
  const node = document.createElement('div')
  const child = document.createElement('div')
  node.appendChild(child)

  const childListMutation: MutationRecord = {
    addedNodes: node.childNodes,
    attributeName: null,
    attributeNamespace: '',
    previousSibling: null,
    nextSibling: null,
    removedNodes: node.childNodes,
    type: 'childList',
    oldValue: null,
    target: child
  }

  test('expect to execute correct mutation for childList type', () => {
    const wordReplacerAlgorithmMock = jest.fn()
    jest.spyOn(wordReplacerAlgorithm, 'default').mockImplementation(wordReplacerAlgorithmMock)
    mutationRecords([childListMutation])
    expect(wordReplacerAlgorithmMock).toHaveBeenCalledWith(child)
  })

  test('expect to execute correct mutation for characterData type', () => {
    const text = document.createTextNode('a new bad arancino')
    const characterDataMutation: MutationRecord = {
      ...childListMutation,
      type: 'characterData',
      addedNodes: text.childNodes,
      removedNodes: text.childNodes,
      target: text
    }
    const wordReplacerAlgorithmMock = jest.fn()
    jest.spyOn(wordReplacerAlgorithm, 'default').mockImplementation(wordReplacerAlgorithmMock)
    mutationRecords([characterDataMutation])
    expect(wordReplacerAlgorithmMock).toHaveBeenCalledWith(text)
  })

  test('expect to no execute mutations for unhandled type', () => {
    const noHandledMutationType: MutationRecord = {
      ...childListMutation,
      type: 'attributes'
    }
    const wordReplacerAlgorithmMock = jest.fn()
    jest.spyOn(wordReplacerAlgorithm, 'default').mockImplementation(wordReplacerAlgorithmMock)
    mutationRecords([noHandledMutationType])
    expect(wordReplacerAlgorithmMock).toHaveBeenCalledTimes(0)
  })
})

describe('createListener', () => {
  test('expect to return if listener is already set', () => {
    expect(listener).toEqual(undefined)
    const resultCreation = createListener()
    expect(resultCreation).toBe(true)
    const newResultCreation = createListener()
    expect(newResultCreation).toBe(false)
  })
})

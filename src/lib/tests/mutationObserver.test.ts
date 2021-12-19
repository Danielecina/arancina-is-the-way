import * as wordReplacerAlgorithm from '../algorithm'
import mutationObserver, {
  listener,
  mutationRecords,
  createListener,
  unsubscribeListener
} from '../mutationObserver'

jest.mock('lodash/debounce', () => fn => fn)

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

  test('expect to execute mutations', () => {
    const wordReplacerAlgorithmMock = jest.fn()
    jest.spyOn(wordReplacerAlgorithm, 'default').mockImplementation(wordReplacerAlgorithmMock)
    mutationRecords()
    expect(wordReplacerAlgorithmMock).toHaveBeenCalled()
  })
})

describe('createListener', () => {
  test('expect to return if listener is already set', () => {
    const body = document.createElement('body')
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })

    expect(listener).toEqual(undefined)
    const resultCreation = createListener()
    expect(resultCreation).toBe(true)
    const newResultCreation = createListener()
    expect(newResultCreation).toBe(false)
  })
})

import mutationObserver, {
  listener,
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

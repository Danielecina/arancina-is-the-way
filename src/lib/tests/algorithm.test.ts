import wordReplacerAlgorithm, {findElementsWithWrongWordAndReplace} from '../algorithm'

describe('findElementsWithWrongWordAndReplace', () => {
  test('expect to return correct value if element is not passed', () => {
    const ret = findElementsWithWrongWordAndReplace(undefined)
    expect(ret).toBe(false)
  })

  test('expect to return correct value if element not contain test', () => {
    const node = document.createElement('div')
    const ret = findElementsWithWrongWordAndReplace(node)
    expect(ret).toBe(false)
  })

  test('expect to return correct value if element have a child without text', () => {
    const node = document.createElement('div')
    const child = document.createElement('div')
    node.appendChild(child)
    const ret = findElementsWithWrongWordAndReplace(node)
    expect(ret).toBe(false)
  })

  test('expect to return correct value if element is a script tag', () => {
    const node = document.createElement('script')
    const ret = findElementsWithWrongWordAndReplace(node)
    expect(ret).toBe(false)
  })

  test('expect to replace text inside of nodes correctly', () => {
    const node = document.createElement('div')
    const child = document.createElement('div')
    child.textContent = 'arancino'
    node.appendChild(child)

    const ret = findElementsWithWrongWordAndReplace(node)
    expect(child.textContent).toEqual('arancina')
    expect(ret).toBe(true)
  })
})

describe('wordReplacerAlgorithm', () => {
  test('expect to return correct value ', () => {
    const node = document.createElement('div')
    node.textContent = 'arancini'

    const ret = wordReplacerAlgorithm(node)
    expect(ret).toEqual(true)
    expect(node.textContent).toEqual('arancine')
  })

  test('expect to fail because not document body is set', () => {
    const ret = wordReplacerAlgorithm(undefined)
    expect(ret).toEqual(false)
  })

  test('expect to fail because body is empty', () => {
    const body = document.createElement('body')
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })

    const ret = wordReplacerAlgorithm(undefined)
    expect(ret).toEqual(false)
  })

  test('expect to fail because body is empty', () => {
    const body = document.createElement('body')
    const node = document.createElement('div')
    body.appendChild(node)

    const child = document.createElement('div')
    child.textContent = 'arancino'
    node.appendChild(child)

    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })

    const ret = wordReplacerAlgorithm(undefined)
    expect(ret).toEqual(true)
    expect(child.textContent).toEqual('arancina')
  })
})

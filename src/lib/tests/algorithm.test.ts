import wordReplacerAlgorithm, {findElementsWithWrongWordAndReplace} from '../algorithm'

describe('findElementsWithWrongWordAndReplace', () => {
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
  test('expect to return correct value for special case', () => {
    const specialCase = [
      {correctWord: 'ARANCINE', wrongWord: 'ARANCINI'},
      {correctWord: 'Arancina', wrongWord: 'Arancino'},
      {correctWord: 'arancina', wrongWord: 'ARaNcInO'}
    ]

    specialCase.forEach(({wrongWord, correctWord}) => {
      const body = document.createElement('body')
      jest.spyOn(document, 'querySelector').mockImplementation(() => {
        return body
      })
      body.textContent = wrongWord

      const ret = wordReplacerAlgorithm()
      expect(ret).toEqual(true)
      expect(body.textContent).toEqual(correctWord)
    })
  })

  test('expect to return false because body is empty', () => {
    const body = document.createElement('body')
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })

    const ret = wordReplacerAlgorithm()
    expect(ret).toEqual(false)
  })

  test('expect to return true if child has wrongWord', () => {
    const body = document.createElement('body')
    const node = document.createElement('div')
    body.appendChild(node)

    const child = document.createElement('div')
    child.textContent = 'arancino'
    node.appendChild(child)

    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })

    const ret = wordReplacerAlgorithm()
    expect(ret).toEqual(true)
    expect(child.textContent).toEqual('arancina')
  })

  test('expect to return correct value with hundred dom element', () => {
    const body = document.createElement('body')
    let lastChild
    appendChildren(body, lastChild, 100)

    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })
    const ret = wordReplacerAlgorithm()
    expect(ret).toEqual(true)
    expect(body.innerHTML).toMatchSnapshot()
  })

  test('expect to return correct value with thousand dom element', () => {
    const body = document.createElement('body')
    let lastChild
    appendChildren(body, lastChild, 1000)

    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return body
    })
    const ret = wordReplacerAlgorithm()
    expect(ret).toEqual(true)
    expect(body.innerHTML).toMatchSnapshot()
  })
})

function appendChildren (element: Element, lastChild: Element, count: number): void {
  let isFirstRun = true
  while (count > 0) {
    const node = document.createElement('div')
    node.textContent = 'arancino'

    if (isFirstRun) {
      element.appendChild(node)
    } else {
      lastChild.appendChild(node)
    }

    if (isFirstRun) {
      isFirstRun = false
    }
    lastChild = node
    count--
  }
}

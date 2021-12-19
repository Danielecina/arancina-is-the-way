import {hasSomeWrongWord} from '../preChecks'

describe('hasSomeWrongWord', () => {
  test('expect to return correct match result', () => {
    const body = document.createElement('body')
    body.textContent = 'arancino'
    const ret = hasSomeWrongWord(body)
    expect(ret).toBe(true)
  })

  test('expect to return correct match result', () => {
    const body = document.createElement('body')
    const node = document.createElement('body')
    node.textContent = 'some text'
    body.appendChild(node)

    const ret = hasSomeWrongWord(body)
    expect(ret).toBe(false)
  })
})

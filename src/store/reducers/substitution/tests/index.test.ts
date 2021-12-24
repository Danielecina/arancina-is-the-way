import substitution, {initialState} from '..'
import {TOGGLE_WATCH_MODE, SUBSTITUTE_WORDS} from '../../../actions/substitution'

describe('substitution reducer', () => {
  test('expect to reduce correctly when type is TOGGLE_WATCH_MODE', () => {
    const payload = {watchMode: true}
    const action = {type: TOGGLE_WATCH_MODE, payload}
    const reduce = substitution(initialState, action)
    expect(reduce).toEqual({
      watchMode: true
    })
  })

  test('expect to reduce correctly when type is SUBSTITUTE_WORDS', () => {
    const action = {type: SUBSTITUTE_WORDS}
    const reduce = substitution(initialState, action)
    expect(reduce).toEqual(initialState)
  })
})

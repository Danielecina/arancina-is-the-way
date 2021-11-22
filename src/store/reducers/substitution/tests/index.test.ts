import substitution, {initialState} from '..'
import {TOGGLE_WATCH_MODE} from '../../../actions/substitution'

describe('substitution reducer', () => {
  test('expect to reduce correctly when initialState', () => {
    const payload = {watchMode: true}
    const action = {type: TOGGLE_WATCH_MODE, payload}
    const reduce = substitution(initialState, action)
    expect(reduce).toEqual({
      watchMode: true
    })
  })
})

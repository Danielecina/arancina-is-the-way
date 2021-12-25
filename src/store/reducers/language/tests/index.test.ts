import language, {initialState} from '..'
import {CHANGE_LANGUAGE} from '../../../actions/language'

describe('language reducer', () => {
  test('expect to reduce correctly default', () => {
    const action = {type: 'noExistingType'}
    const reduce = language(initialState, action)
    expect(reduce).toEqual(initialState)
  })

  test('expect to reduce correctly when type is TOGGLE_WATCH_MODE', () => {
    const payload = {selected: 'palermitano', locale: 'it'}
    const action = {type: CHANGE_LANGUAGE, payload}
    const reduce = language(initialState, action)
    expect(reduce).toEqual({
      selected: 'palermitano',
      locale: 'it'
    })
  })
})

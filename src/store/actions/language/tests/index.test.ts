import {changeLanguage, CHANGE_LANGUAGE} from '..'

test('expect to call changeLanguage correctly', () => {
  const expectedAction = {
    type: CHANGE_LANGUAGE,
    payload: {
      selected: 'siculEnglish'
    }
  }
  const ret = changeLanguage('siculEnglish')
  expect(ret).toEqual(expectedAction)
})

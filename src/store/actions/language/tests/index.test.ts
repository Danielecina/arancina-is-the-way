import {changeLanguage, CHANGE_LANGUAGE} from '..'

test('expect to call changeLanguage correctly', () => {
  const expectedAction = {
    type: CHANGE_LANGUAGE,
    payload: {
      selected: 'siculEnglish',
      locale: 'en'
    }
  }
  const ret = changeLanguage('siculEnglish', 'en')
  expect(ret).toEqual(expectedAction)
})

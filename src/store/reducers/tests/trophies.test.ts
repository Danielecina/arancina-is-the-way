import trophies from '../trophies'
import {TOGGLE_WATCH_MODE} from "../../actions/substitution";

const initialState = {
  countOfWrongWordsFound: 0
}

const action = {
  type: TOGGLE_WATCH_MODE,
  payload: {
    errorsCount: 12
  }
}

describe('trophies', () => {
  // const toISOString = '2016-06-20T12:08:10.000Z'
  // jest.useFakeTimers('modern')
  //   .setSystemTime(new Date(toISOString).getTime());
  
  test('expect to return correct state', () => {
    const ret = trophies(initialState, action)
    expect(ret).toEqual({
      countOfWrongWordsFound: 12
    })
  })
  
  // test.skip('expect to return correct state with other initialState', () => {
  //   const initialState = {
  //     countOfWrongWordsFound: {
  //       'example.com': {
  //         siteUrl: 'example.com',
  //         value: 12,
  //         changedAt: toISOString
  //       }
  //     }
  //   }
  //   const action = {
  //     type: COUNT_OF_WRONG_WORDS_FOUND,
  //     payload: {
  //       siteUrl: 'arancino.com',
  //       value: 100000000
  //     }
  //   }
  //   const ret = trophies(initialState, action)
  //   expect(ret).toEqual({
  //     countOfWrongWordsFound: {
  //       'arancino.com': {
  //         siteUrl: 'arancino.com',
  //         value: 100000000,
  //         changedAt: toISOString
  //       }
  //     }
  //   })
  // })
})

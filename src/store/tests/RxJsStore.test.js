import React from 'react'

import {setDefaultsFromReducers} from '../RxJsStore'

describe('RxJsStore', () => {
  test('setDefaultsFromReducers', () => {
    const result = setDefaultsFromReducers()
    expect(result).toEqual({
      trophies: {
        countOfWrongWordsFound: 0
      },
      substitution: {
        watchMode: false
      }
    })
  })
})

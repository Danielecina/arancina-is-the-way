import React from 'react'
import renderer from 'react-test-renderer'

import Illustration from '..'

describe('Toolbar', () => {
  test('snapshot', () => {
    const element = renderer.create(<Illustration />).toJSON()
    expect(element).toMatchSnapshot()
  })

  test('snapshot with watchMode true', () => {
    const element = renderer.create(<Illustration watchMode />).toJSON()
    expect(element).toMatchSnapshot()
  })
})

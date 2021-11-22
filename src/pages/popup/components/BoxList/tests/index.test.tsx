import React from 'react'
import renderer from 'react-test-renderer'

import BoxList, {BoxRow, BoxRowActions, BoxRowContent} from '..'

const rows = [
  {
    id: 'test',
    content: 'test-content',
    actions: 'test-actions',
    extra: 'test-extra'
  }
]

describe('BoxList component', () => {
  test('snapshot', () => {
    const element = renderer.create(<BoxList rows={rows} />).toJSON()
    expect(element).toMatchSnapshot()
  })

  test('boxRow snapshot', () => {
    const element = renderer.create(<BoxRow>{'BoxRow children'}</BoxRow>).toJSON()
    expect(element).toMatchSnapshot()
  })

  test('BoxRowActions snapshot', () => {
    const element = renderer.create(<BoxRowActions>{'BoxRowActions children'}</BoxRowActions>).toJSON()
    expect(element).toMatchSnapshot()
  })

  test('BoxRowActions snapshot', () => {
    const element = renderer.create(<BoxRowContent>{'BoxRowContent children'}</BoxRowContent>).toJSON()
    expect(element).toMatchSnapshot()
  })
})

import React from 'react'
import {render, screen} from '@testing-library/react'
import renderer from 'react-test-renderer'
import userEvent from '@testing-library/user-event'

import IntlWrapper from '../../../../../testUtilies/intlWrapper'
import HomeComponent from '..'

const props = {
  watchMode: true,
  onChangeWatchMode: jest.fn(),
  onSubstituteWords: jest.fn()
}

const Home: React.FC = () => (
  <IntlWrapper>
    <HomeComponent {...props} />
  </IntlWrapper>
)

describe('Home', () => {
  test('snapshot', () => {
    const element = renderer.create(<Home />).toJSON()
    expect(element).toMatchSnapshot()
  })

  test('expect to call onChangeWatchMode', () => {
    render(<Home />)
    userEvent.click(screen.getByRole('button'))
    expect(props.onSubstituteWords).toHaveBeenCalledTimes(1)
  })

  test('expect to call onSubstituteWords', () => {
    render(<Home />)
    userEvent.click(screen.getByRole('switch'))
    expect(props.onChangeWatchMode).toHaveBeenCalledTimes(1)
  })
})

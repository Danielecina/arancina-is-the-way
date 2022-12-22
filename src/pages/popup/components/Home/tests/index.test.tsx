import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'

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
    const {container} = render(<Home />)
    expect(container).toMatchSnapshot()
  })

  test('expect to call onChangeWatchMode', async () => {
    render(<Home />)
    fireEvent.click(await screen.findByRole('button'))
    expect(props.onSubstituteWords).toHaveBeenCalledTimes(1)
  })

  test('expect to call onSubstituteWords', async () => {
    render(<Home />)
    fireEvent.click(await screen.findByRole('switch'))
    expect(props.onChangeWatchMode).toHaveBeenCalledTimes(1)
  })
})

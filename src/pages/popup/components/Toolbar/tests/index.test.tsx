import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IntlWrapper from '../../../../../testUtilies/intlWrapper'
import Toolbar, {TooltipInfo} from '..'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

describe('Toolbar component', () => {
  test('snapshot', () => {
    const element = renderer.create(<Toolbar />).toJSON()
    expect(element).toMatchSnapshot()
  })

  test('expect to see changes to icons when click contributing link', () => {
    render(<MemoryRouter><Toolbar /></MemoryRouter>)
    const button = screen.getByRole('button', {name: /contributing/i})
    const githubIcon = screen.getByRole('img', {name: /github/i})

    expect(githubIcon).toBeTruthy()
    userEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalledWith('/contributing')

    const homeIcon = screen.getByRole('img', {name: /home/i})
    expect(homeIcon).toBeTruthy()

    userEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalledWith('/')
  })

  test('expect to see correct TooltipInfo', () => {
    const element = renderer.create(
      <IntlWrapper>
        <TooltipInfo />
      </IntlWrapper>
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MockProvider from '../../../testUtilies/providerWrapper'
import App from '..'

const mockState = {
  substitution: {
    watchMode: true
  }
}

describe('App component', () => {
  test('expect to render correctly illustration', () => {
    render(
      <MockProvider initialEntries={['/']} mockState={mockState}>
        <App />
      </MockProvider>
    )
    const illustration = screen.getByTitle(/arancina-illustration/i)
    expect(illustration).toBeTruthy()
  })

  test('expect to render correct toolbar', () => {
    render(
      <MockProvider initialEntries={['/']} mockState={mockState}>
        <App />
      </MockProvider>
    )
    const header = screen.getByRole('banner')
    expect(header).toBeTruthy()
  })

  test('expect to render correctly pages on navigation', () => {
    render(
      <MockProvider initialEntries={['/']} mockState={mockState}>
        <App />
      </MockProvider>
    )
    const isHomePageText = 'Find and replace words'
    expect(screen.getByText(isHomePageText)).toBeInTheDocument()

    const button = screen.getByRole('button', {name: /contributing/i})
    userEvent.click(button)

    const isContributingPageText = 'Do you like extension?'
    expect(screen.getByText(isContributingPageText)).toBeInTheDocument()
  })
})

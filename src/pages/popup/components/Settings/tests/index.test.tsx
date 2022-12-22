import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IntlWrapper from '../../../../../testUtilies/intlWrapper'
import MockProvider from '../../../../../testUtilies/providerWrapper'
import SettingsComponent, {URL} from '..'
import * as chromeUtils from '../../../../../lib/chromeUtils'

const mockState = {
  language: {
    selected: 'palermitano'
  }
}

const onChangeLanguage = jest.fn()
const element = (
  <MockProvider initialEntries={['/settings']} mockState={mockState}>
    <IntlWrapper messagesLocale={mockState.language.selected}>
      <SettingsComponent onChangeLanguage={onChangeLanguage} />
    </IntlWrapper>
  </MockProvider>
)

describe('Settings component', () => {
  beforeEach(() => jest.clearAllMocks())

  test('expect to click action', async () => {
    const createNewTab = jest.fn((url) => url)
    jest.spyOn(chromeUtils, 'createNewTab').mockImplementation(createNewTab)

    render(element)
    userEvent.click(screen.getByRole('button', {name: /github/i}))

    await waitFor(() => {
      expect(createNewTab).toHaveBeenCalledTimes(1)
      expect(createNewTab).toHaveBeenCalledWith(URL)
    })
  })

  test('expect to change language', async () => {
    render(element)

    const radioGroup = document.querySelector('.ant-radio-group')
    if (!radioGroup) {
      throw new Error('missing radio group')
    }

    // @ts-ignore
    const radioButtonPalermoElement = radioGroup?.lastChild.className
    expect(radioButtonPalermoElement).toMatch(/ant-radio-button-wrapper-checked/gm)

    fireEvent.click(await screen.findByRole('radio', {name: 'Sicul-english'}))
    expect(onChangeLanguage).toHaveBeenCalledTimes(1)
    expect(onChangeLanguage).toHaveBeenCalledWith('siculEnglish')
  })
})

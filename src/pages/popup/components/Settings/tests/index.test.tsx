import React from 'react'
import {render, screen} from '@testing-library/react'
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

  test('expect to click action', () => {
    const createNewTab = jest.fn((url) => url)
    jest.spyOn(chromeUtils, 'createNewTab').mockImplementation(createNewTab)

    render(element)
    userEvent.click(screen.getByRole('button'))
    expect(createNewTab).toHaveBeenCalledTimes(1)
    expect(createNewTab).toHaveBeenCalledWith(URL)
  })

  test('expect to change language', () => {
    render(element)

    const radioGroup = document.querySelector('.ant-radio-group')
    if (!radioGroup) {
      throw new Error('missing radio group')
    }

    // @ts-ignore
    const radioButtonPalermoElement = radioGroup?.lastChild.className
    expect(radioButtonPalermoElement).toMatch(/ant-radio-button-wrapper-checked/gm)

    userEvent.click(screen.getByRole('radio', {name: 'Sicul-english'}))
    expect(onChangeLanguage).toHaveBeenCalledWith('siculEnglish')
  })
})

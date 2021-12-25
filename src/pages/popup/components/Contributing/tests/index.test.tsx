import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IntlWrapper from '../../../../../testUtilies/intlWrapper'
import ContributingComponent, {URL} from '..'
import * as chromeUtils from '../../../../../lib/chromeUtils'

const Contributing: React.FC = () => (
  <IntlWrapper>
    <ContributingComponent />
  </IntlWrapper>
)

describe('Contributing component', () => {
  test('expect to click action', () => {
    const createNewTab = jest.fn((url) => url)
    jest.spyOn(chromeUtils, 'createNewTab').mockImplementation(createNewTab)

    render(<Contributing />)
    userEvent.click(screen.getByRole('button'))
    expect(createNewTab).toHaveBeenCalledTimes(1)
    expect(createNewTab).toHaveBeenCalledWith(URL)
  })
})

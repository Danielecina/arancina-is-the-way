import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Contributing, {URL} from '..'
import * as chromeUtils from '../../../../../lib/chromeUtils'

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

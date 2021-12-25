import React from 'react'
import {IntlProvider} from 'react-intl'

import messages from '../strings'

const IntlWrapper: React.FC = ({children}) => (
  <IntlProvider
    defaultLocale={'en'}
    locale={'en'}
    messages={messages.en}
  >
    {children}
  </IntlProvider>
)

export default IntlWrapper

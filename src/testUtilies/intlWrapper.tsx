import React, {ReactNode} from 'react'
import {IntlProvider} from 'react-intl'

import messages from '../strings'

type IntlWrapperType = {
  children: ReactNode,
  defaultLocale?: string,
  locale?: string,
  messagesLocale?: string
}
const IntlWrapper: React.FC<IntlWrapperType> = ({
  children,
  defaultLocale = 'en',
  locale = 'en',
  messagesLocale = 'en'
}) => (
  <IntlProvider
    defaultLocale={defaultLocale}
    locale={locale}
    messages={messages[messagesLocale]}
  >
    {children}
  </IntlProvider>
)

export default IntlWrapper

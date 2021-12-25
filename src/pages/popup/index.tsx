import React, {useCallback} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IntlProvider} from 'react-intl'

import {RootState} from '../../store'
import {SubstitutionReducer} from '../../store/reducers/substitution'
import {DEFAULT_LANGUAGE, LanguageReducer} from '../../store/reducers/language'
import {toggleWatchModeMessage, substituteWords} from '../../store/actions/substitution'
import {changeLanguage} from '../../store/actions/language'
import Settings from './components/Settings'
import Home from './components/Home'
import Illustration from './components/Illustration'
import Toolbar from './components/Toolbar'
import messages from '../../strings'

import './index.css'

const currentBrowserLocale = navigator.language.split(/[-_]/)[0]

const App: React.FC = () => {
  const language: LanguageReducer = useSelector((state: RootState) => state.language)
  const substitution: SubstitutionReducer = useSelector((state: RootState) => state.substitution)
  const dispatch = useDispatch()

  const onChangeWatchMode = useCallback(async (value) => {
    dispatch(await toggleWatchModeMessage(value))
  }, [dispatch])

  const onSubstituteWords = useCallback(async () => {
    dispatch(await substituteWords())
  }, [dispatch])

  const onChangeLanguage = useCallback(async (selected) => {
    dispatch(await changeLanguage(selected))
  }, [dispatch])

  const renderHome = useCallback(() => {
    return (
      <Home
        onChangeWatchMode={onChangeWatchMode}
        onSubstituteWords={onSubstituteWords}
        watchMode={substitution?.watchMode}
      />
    )
  }, [onChangeWatchMode, onSubstituteWords, substitution?.watchMode])

  const renderSettings = useCallback(() => {
    return <Settings onChangeLanguage={onChangeLanguage} />
  }, [onChangeLanguage])

  return (
    <IntlProvider
      defaultLocale={'en'}
      locale={currentBrowserLocale}
      messages={getMessages(language.selected)}
    >
      <div className={'app'}>
        <Illustration watchMode={!!substitution?.watchMode} />
        <Toolbar />
        <Switch>
          <Route path={'/settings'} render={renderSettings} />
          <Route render={renderHome} />
        </Switch>
      </div>
    </IntlProvider>
  )
}

export default App

type getMessagesType = Record<string, string>
function getMessages (selected: string): getMessagesType {
  const isToDetectFromBrowser = selected === DEFAULT_LANGUAGE
  const currentBrowserLanguage = navigator.language.split(/[-_]/)[0]

  if (isToDetectFromBrowser) {
    return messages[currentBrowserLanguage] || messages.en
  }

  return messages[selected] || messages.en
}

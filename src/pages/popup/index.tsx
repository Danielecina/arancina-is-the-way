import React, {useCallback} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IntlProvider} from 'react-intl'

import {RootState} from '../../store'
import {SubstitutionReducer} from '../../store/reducers/substitution'
import {LanguageReducer} from '../../store/reducers/language'
import {toggleWatchModeMessage, substituteWords} from '../../store/actions/substitution'
import {changeLanguage} from '../../store/actions/language'
import Settings from './components/Settings'
import Home from './components/Home'
import Illustration from './components/Illustration'
import Toolbar from './components/Toolbar'
import messages from '../../strings'

import './index.css'

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

  const onChangeLanguage = useCallback(async (selected, locale) => {
    dispatch(await changeLanguage(selected, locale))
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

  const translations = messages[language.selected] ?
    messages[language.selected] :
    messages.en

  return (
    <IntlProvider
      defaultLocale={'en'}
      locale={language.locale}
      messages={translations}
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

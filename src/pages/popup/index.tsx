import React, {useCallback} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IntlProvider} from 'react-intl'

import {RootState} from '../../store'
import {SubstitutionReducer} from '../../store/reducers/substitution'
import {toggleWatchModeMessage, substituteWords} from '../../store/actions/substitution'
import Contributing from './components/Contributing'
import Home from './components/Home'
import Illustration from './components/Illustration'
import Toolbar from './components/Toolbar'
import messages from '../../strings'

import './index.css'

const language = navigator.language.split(/[-_]/)[0]
const translations = messages[language] ? messages[language] : messages.en

const App: React.FC = () => {
  const substitution: SubstitutionReducer = useSelector((state: RootState) => state.substitution)
  const dispatch = useDispatch()

  const onChangeWatchMode = useCallback(async (value) => {
    dispatch(await toggleWatchModeMessage(value))
  }, [dispatch])

  const onSubstituteWords = useCallback(async () => {
    dispatch(await substituteWords())
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

  return (
    <IntlProvider
      defaultLocale={'en'}
      locale={language}
      messages={translations}
    >
      <div className={'app'}>
        <Illustration watchMode={substitution?.watchMode} />
        <Toolbar />
        <Switch>
          <Route component={Contributing} path={'/contributing'} />
          <Route render={renderHome} />
        </Switch>
      </div>
    </IntlProvider>
  )
}

export default App

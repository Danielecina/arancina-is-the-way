import React, {useCallback} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {RootState} from '../../store'
import {SubstitutionReducer} from '../../store/reducers/substitution'
import {toggleWatchModeMessage, substituteWords} from '../../store/actions/substitution'
import Contributing from './components/Contributing'
import Home from './components/Home'
import Illustration from './components/Illustration'
import Toolbar from './components/Toolbar'
import './index.css'

const App = () => {
  const substitution: SubstitutionReducer = useSelector((state: RootState) => state.substitution)
  const dispatch = useDispatch()

  const onChangeWatchMode = useCallback(async (value) => {
    dispatch(await toggleWatchModeMessage(value))
  }, [dispatch])

  const onSubstituteWords = useCallback(async () => {
    dispatch(await substituteWords())
  }, [dispatch])

  return (
    <div className={'app'}>
      <Illustration watchMode={substitution?.watchMode} />
      <Toolbar />
      <Switch>
        <Route component={Contributing} path={'/contributing'} />
        <Route
          render={() => (
            <Home
              onChangeWatchMode={onChangeWatchMode}
              onSubstituteWords={onSubstituteWords}
              watchMode={substitution?.watchMode}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default App

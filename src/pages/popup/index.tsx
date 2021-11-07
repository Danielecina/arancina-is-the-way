import React, {useCallback} from "react"
import {Switch, Route} from "react-router-dom"

import Home from './components/Home'
import AppHeader from "./components/AppHeader"
import {useStore} from "../../store/RxJsStore";

import {toggleWatchModeMessage, substituteWords} from "../../store/actions/substitution"

import './index.css'

const App = () => {
  const {storeState, dispatch} = useStore()
  const {substitution} = storeState
  console.log('[RERENDER APP]', storeState)

  const onChangeWatchMode = useCallback((value) => {
    dispatch(toggleWatchModeMessage(value))
  }, [dispatch])
  
  const onSubstituteWords = useCallback(() => {
    dispatch(substituteWords())
  }, [dispatch])
  
  return (
    <div className={'app'}>
      <AppHeader watchMode={substitution?.watchMode} />
      <Switch>
        <Route render={() => (
          <Home
            watchMode={substitution?.watchMode}
            onChangeWatchMode={onChangeWatchMode}
            onSubstituteWords={onSubstituteWords}
          />
        )} />
      </Switch>
    </div>
  )
}

export default App

import React, {useCallback} from "react"
import {Switch, Route} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {RootState} from '../../store'

import {toggleWatchModeMessage, substituteWords} from "../../store/actions/substitution"

import Home from './components/Home'
import Illustration from "./components/Illustration"
import Toolbar from './components/Toolbar'

import './index.css'
import {SubstitutionReducer} from "../../store/reducers/substitution";

const App = () => {
  // const {storeState, dispatch} = useStore()
  // const {substitution} = storeState
  const substitution: SubstitutionReducer = useSelector((state: RootState) => state.substitution)
  console.log('substitution', substitution)
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

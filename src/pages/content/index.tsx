import React from "react"
import {Switch, Route} from "react-router-dom"

import Home from './components/Home'
import AppHeader from "./components/AppHeader"

import './index.css'

const App = () => {
  return (
    <div className={'app'}>
      <AppHeader />
      <Switch>
        <Route component={Home} />
      </Switch>
    </div>
  )
}

export default App

import React, {useEffect, useState} from "react"
import {Switch, Route} from "react-router-dom"

import Home from './components/Home'
import AppHeader from "./components/AppHeader"
import {State, StoreClass, START_UP_STORE} from "../../store/RxJsStore";

import './index.css'
import {ChromeMessage} from "../../types"

const App = () => {
  const [storeInstance, setStoreInstance] = useState<StoreClass | null>(null)
  const [storeState, setStoreState] = useState<State>({})
  
  chrome.runtime.onMessage.addListener((
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender
  ) => {
    console.log('React listener start', message, sender)
    // type === START_UP_STORE && setStoreInstance(payload)
  })
  useEffect(() => {
    console.log('useEffect start 1')
    
  }, [])
  
  useEffect(() => {
    console.log('useEffect start 2')
    if (!storeInstance) return
    console.log('listener start')
    const s = storeInstance.subscribe((setStoreState))
    return s.unsubscribe()
  }, [storeInstance])

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

import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {InputSwitch as Switch} from "primereact/inputswitch";

import {fixWordsMessage, toggleWatchModeMessage} from "../../actions";
import {getCurrentTabUId} from "../../chrome/utils";
import useStore from "../../hooks/useStore";

import './index.css'

const Home = () => {
  const {store, setStoreState} = useStore()
  // const [watchModeResponse, setWatchModeResponse] = useState(null)
  const [enableWatchMode, setEnableWatchMode] = useState<boolean>(store?.watchMode)
  
  useEffect(() => {
    setEnableWatchMode(store?.watchMode)
  }, [store])
  
  const sendTestMessage = useCallback(() => {
    getCurrentTabUId((id) => {
      id && chrome.tabs.sendMessage(id, fixWordsMessage())
    })
  }, [])
  
  const setWatchMode = useCallback((isEnabled) => {
    getCurrentTabUId((id) => {
      id && chrome.tabs.sendMessage(id, toggleWatchModeMessage({watchMode: isEnabled}))
    })
    
    setEnableWatchMode(isEnabled)
    setStoreState({watchMode: isEnabled})
  }, [])
  
  return (
    <main className={'home'}>
      <div className={'home-row'}>
        <div className={'title'}>{'Find and replace words'}</div>
        <Button className={'p-button-rounded'} icon={"pi pi-search"} onClick={sendTestMessage} />
      </div>
      <small>{'Find all reference and replace with our correct words'}</small>
      <div className={'home-row'}>
        <div className={'title'}>{'Auto replacer'}</div>
        <Switch
          checked={enableWatchMode}
          onChange={(e) => setWatchMode(e.value)}
        />
      </div>
      <small>{'If activated, this feature will take care of replacing all words automatically'}</small>
      {/*<div>*/}
      {/*  Response from content:*/}
      {/*  <p>{callbackResponse}</p>*/}
      {/*</div>*/}
    </main>
  );
}

export default Home;

import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "primereact/button";
import PropTypes from "prop-types"
import {InputSwitch as Switch} from "primereact/inputswitch";
// import {fixWordsMessage, toggleWatchModeMessage} from "../../../../store/actions";

import {getCurrentTabUId} from "../../../../lib/chromeUtils";
import './index.css'

const Home = ({watchMode, onChangeWatchMode}) => {
  const sendTestMessage = useCallback(() => {
    getCurrentTabUId((id) => {
      // id && chrome.tabs.sendMessage(id, fixWordsMessage())
    })
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
          checked={watchMode}
          onChange={(e) => onChangeWatchMode(e.value)}
        />
      </div>
      <small>{'If activated, this feature will take care of replacing all words automatically'}</small>
    </main>
  );
}
Home.propTypes = {
  watchMode: PropTypes.bool,
  onChangeWatchMode: PropTypes.func.isRequired
}

export default Home;

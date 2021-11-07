import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types"
import {Button, Switch} from "antd"

import './index.css'

const Home = ({watchMode, onChangeWatchMode}) => {
  return (
    <main className={'home'}>
      <div className={'home-row'}>
        <div className={'title'}>{'Find and replace words'}</div>
        <Button icon={'search'} onClick={() => {}} />
      </div>
      <small>{'Find all reference and replace with our correct words'}</small>
      <div className={'home-row'}>
        <div className={'title'}>{'Auto replacer'}</div>
        <Switch
          checked={watchMode}
          onChange={onChangeWatchMode}
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

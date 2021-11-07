import React from 'react';
import PropTypes from "prop-types"
import {Button, Switch} from "antd"
import {SearchOutlined} from '@ant-design/icons'

import './index.css'

Home.propTypes = {
  watchMode: PropTypes.bool,
  onChangeWatchMode: PropTypes.func.isRequired,
  onSubstituteWords: PropTypes.func.isRequired
}
export default function Home ({watchMode, onChangeWatchMode, onSubstituteWords}) {
  return (
    <main className={'home'}>
      <div className={'home-row'}>
        <div className={'title'}>{'Find and replace words'}</div>
        <Button
          shape={'circle'}
          type={'primary'}
          icon={<SearchOutlined />}
          onClick={onSubstituteWords}
        />
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

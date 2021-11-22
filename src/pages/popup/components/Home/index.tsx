import React from 'react'
import PropTypes from 'prop-types'
import {Button, Switch} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

import BoxList from '../BoxList'

Home.propTypes = {
  onChangeWatchMode: PropTypes.func.isRequired,
  onSubstituteWords: PropTypes.func.isRequired,
  watchMode: PropTypes.bool
}
export default function Home ({watchMode, onChangeWatchMode, onSubstituteWords}) {
  const rows = [
    {
      id: 'find',
      content: 'Find and replace words',
      actions: <Button icon={<SearchOutlined />} onClick={onSubstituteWords} shape={'circle'} type={'primary'} />,
      extra: <small>{'Find all reference and replace with our correct words'}</small>
    },
    {
      id: 'auto-replacer',
      content: 'Auto replacer',
      actions: <Switch checked={watchMode} onChange={onChangeWatchMode} />,
      extra: <small>{'If activated, this feature will take care of replacing all words automatically'}</small>
    }
  ]

  return <BoxList rows={rows} />
}

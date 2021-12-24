import React from 'react'
import {Button, Switch} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

import BoxList from '../BoxList'

type HomeType = {
  onChangeWatchMode: (value: any) => Promise<void>,
  onSubstituteWords: () => Promise<void>,
  watchMode?: boolean
}

const Home: React.FC<HomeType> = ({watchMode, onChangeWatchMode, onSubstituteWords}) => {
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

export default Home

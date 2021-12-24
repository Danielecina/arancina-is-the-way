import React from 'react'
import {useIntl} from 'react-intl'
import {Button, Switch} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

import BoxList from '../BoxList'

type HomeType = {
  onChangeWatchMode: (value: any) => Promise<void>,
  onSubstituteWords: () => Promise<void>,
  watchMode?: boolean
}

const Home: React.FC<HomeType> = ({watchMode, onChangeWatchMode, onSubstituteWords}) => {
  const {formatMessage} = useIntl()
  const rows = [
    {
      id: 'find',
      content: formatMessage({id: 'home.findAndReplace'}),
      actions: <Button icon={<SearchOutlined />} onClick={onSubstituteWords} shape={'circle'} type={'primary'} />,
      extra: <small>{formatMessage({id: 'home.findAndReplace.description'})}</small>
    },
    {
      id: 'auto-replacer',
      content: formatMessage({id: 'home.autoReplace'}),
      actions: <Switch checked={watchMode} onChange={onChangeWatchMode} />,
      extra: <small>{formatMessage({id: 'home.autoReplace.description'})}</small>
    }
  ]

  return <BoxList rows={rows} />
}

export default Home

import React, {useCallback, useState} from 'react'
import {Button, Tooltip} from 'antd'
import {useHistory} from 'react-router-dom'
import {TrophyOutlined, GithubOutlined, HomeOutlined} from '@ant-design/icons'

import './index.css'

export default function Toolbar () {
  const [returnToHome, setReturnToHome] = useState(false)
  const history = useHistory()
  const onClick = useCallback(() => {
    if (!returnToHome) {
      history.push('/contributing')
      setReturnToHome(true)
      return
    }
    history.push('/')
    setReturnToHome(false)
  }, [returnToHome, history])

  return (
    <header className={'toolbar'}>
      <div className={'left'}>
        <Tooltip
          color={'hsla(0,0%,100%,.2)'}
          placement={'right'}
          title={TooltipInfo}
        >
          <Button
            icon={<TrophyOutlined />}
            onClick={() => {}}
            shape={'circle'}
            type={'primary'}
          />
        </Tooltip>
      </div>
      <div className={'right'}>
        <Button
          aria-label={'contributing'}
          icon={!returnToHome ? <GithubOutlined /> : <HomeOutlined />}
          onClick={onClick}
          shape={'circle'}
          type={'primary'}
        />
      </div>
    </header>
  )
}

const tooltipStyle = {fontWeight: 900}
const TooltipInfo = <span style={tooltipStyle}>{'Coming soon'}</span>

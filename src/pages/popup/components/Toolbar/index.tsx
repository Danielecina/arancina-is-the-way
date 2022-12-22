import React, {useCallback, useState} from 'react'
import {Button, Tooltip} from 'antd'
import {useHistory} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {TrophyOutlined, HomeOutlined, MoreOutlined} from '@ant-design/icons'

import './index.css'

const Toolbar: React.FC = () => {
  const [returnToHome, setReturnToHome] = useState(false)
  const history = useHistory()
  const onClick = useCallback(() => {
    if (!returnToHome) {
      history.push('/settings')
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
          title={<TooltipInfo />}
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
          aria-label={'settings'}
          icon={!returnToHome ? <MoreOutlined /> : <HomeOutlined />}
          onClick={onClick}
          shape={'circle'}
          type={'primary'}
        />
      </div>
    </header>
  )
}

const tooltipStyle = {fontWeight: 900}
export const TooltipInfo: React.FC = () => {
  const {formatMessage} = useIntl()
  return <span style={tooltipStyle}>{formatMessage({id: 'comingSoon'})}</span>
}

export default Toolbar

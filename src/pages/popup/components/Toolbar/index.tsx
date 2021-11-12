import React from 'react';
import {Button, Tooltip} from "antd"
import {TrophyOutlined} from '@ant-design/icons'

import './index.css'

Toolbar.propTypes = {}
export default function Toolbar () {
  return (
    <div className={'toolbar'}>
      <Tooltip
        color={'hsla(0,0%,100%,.2)'}
        placement={'left'}
        title={TooltipInfo}
      >
        <Button
          icon={<TrophyOutlined />}
          shape={'circle'}
          type={'primary'}
          onClick={() => {}}
        />
      </Tooltip>
    </div>
  );
}

const TooltipInfo = <span style={{fontWeight: 900}}>{'Coming soon'}</span>

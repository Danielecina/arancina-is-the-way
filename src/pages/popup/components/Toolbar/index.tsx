import React from 'react';
import {Button} from "antd"
import {TrophyOutlined} from '@ant-design/icons'

import './index.css'

Toolbar.propTypes = {}
export default function Toolbar () {
  return (
    <div className={'toolbar'}>
      <Button
        icon={<TrophyOutlined />}
        shape={'circle'}
        type={'primary'}
        onClick={() => {}}
      />
    </div>
  );
}

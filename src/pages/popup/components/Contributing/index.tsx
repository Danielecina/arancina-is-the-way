import React from 'react'
import {StarOutlined} from '@ant-design/icons'
import {Button} from 'antd'

import BoxList from '../BoxList'
import {createNewTab} from '../../../../lib/chromeUtils'

export const URL = 'https://github.com/Danielecina/arancina-is-the-way'

export default function Contributing () {
  const rows = [
    {
      id: 'github',
      content: 'Do you like extension?',
      extra: 'Support arancina on GitHub',
      actions: (
        <Button
          icon={<StarOutlined />}
          onClick={() => createNewTab(URL)}
          shape={'circle'}
          type={'primary'}
        />
      )
    }
  ]

  return <BoxList rows={rows} />
}

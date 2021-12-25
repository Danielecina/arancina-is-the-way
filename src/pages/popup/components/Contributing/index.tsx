import React from 'react'
import {StarOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import {useIntl} from 'react-intl'

import BoxList, {RowType} from '../BoxList'
import {createNewTab} from '../../../../lib/chromeUtils'

export const URL: string = 'https://github.com/Danielecina/arancina-is-the-way'
const Contributing: React.FC = () => {
  const {formatMessage} = useIntl()
  const rows: Array<RowType> = [
    {
      id: 'github',
      content: formatMessage({id: 'contributing.content'}),
      extra: formatMessage({id: 'contributing.extra'}),
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

export default Contributing

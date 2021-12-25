import React, {useCallback} from 'react'
import {GithubOutlined} from '@ant-design/icons'
import {Button, Radio} from 'antd'
import {useIntl} from 'react-intl'
import {useSelector} from 'react-redux'

import {LanguageReducer, DEFAULT_LANGUAGE, PALERMITANO} from '../../../../store/reducers/language'
import {RootState} from '../../../../store'
import {createNewTab} from '../../../../lib/chromeUtils'
import BoxList, {RowType} from '../BoxList'
import './index.css'

export const URL: string = 'https://github.com/Danielecina/arancina-is-the-way'

type SettingsType = {
  onChangeLanguage: (selected: string, locale: string) => Promise<void>
}
const Settings: React.FC<SettingsType> = ({onChangeLanguage}) => {
  const language: LanguageReducer = useSelector((state: RootState) => state.language)
  const {formatMessage} = useIntl()
  const onChange = useCallback((event) => {
    let locale: string = 'en'
    if (event.target.value === PALERMITANO) {
      locale = 'it'
    }

    return onChangeLanguage(event.target.value, locale)
  }, [onChangeLanguage])

  const rows: Array<RowType> = [
    {
      id: 'github',
      content: formatMessage({id: 'settings.github.content'}),
      extra: formatMessage({id: 'settings.github.extra'}),
      actions: (
        <Button
          icon={<GithubOutlined />}
          onClick={() => createNewTab(URL)}
          shape={'circle'}
          type={'primary'}
        />
      )
    },
    {
      id: 'language',
      content: formatMessage({id: 'settings.language.content'}),
      extra: (
        <div className={'language-selector'}>
          <Radio.Group
            buttonStyle={'solid'}
            defaultValue={language.selected}
            onChange={onChange}
            size={'small'}
            value={language.selected}
          >
            <Radio.Button value={DEFAULT_LANGUAGE}>
              {formatMessage({id: 'settings.language.browser'})}
            </Radio.Button>
            <Radio.Button value={'siculEnglish'}>
              {formatMessage({id: 'settings.language.siculEnglish'})}
            </Radio.Button>
            <Radio.Button value={'palermitano'}>
              {formatMessage({id: 'settings.language.palermitano'})}
            </Radio.Button>
          </Radio.Group>
        </div>
      )
    }
  ]
  return <BoxList rows={rows} />
}

export default Settings

import {CHANGE_LANGUAGE} from '../../actions/language'

export type DefaultLanguageType = 'browser'
export const DEFAULT_LANGUAGE: DefaultLanguageType = 'browser'

export type SiculEnglishType = 'siculEnglish'
export const SICUL_ENGLISH: SiculEnglishType = 'siculEnglish'

export type PalermitanoType = 'palermitano'
export const PALERMITANO: PalermitanoType = 'palermitano'

export interface LanguageReducer {
  selected: DefaultLanguageType | SiculEnglishType | PalermitanoType
  locale: 'en'| 'it'
}

export const initialState: LanguageReducer = {
  selected: 'browser',
  locale: 'en'
}

const language = (
  state: LanguageReducer = initialState,
  {type, payload} : {type: string, payload?: any}
): LanguageReducer => {
  switch (type) {
    case CHANGE_LANGUAGE: {
      const {selected, locale} = payload
      return {selected, locale}
    }
    default: {
      return state
    }
  }
}

export default language

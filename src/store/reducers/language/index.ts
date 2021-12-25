import {CHANGE_LANGUAGE} from '../../actions/language'

export type DefaultLanguageType = 'browser'
export const DEFAULT_LANGUAGE: DefaultLanguageType = 'browser'

export type SiculEnglishType = 'siculEnglish'
export const SICUL_ENGLISH: SiculEnglishType = 'siculEnglish'

export type PalermitanoType = 'palermitano'
export const PALERMITANO: PalermitanoType = 'palermitano'

export interface LanguageReducer {
  selected: DefaultLanguageType | SiculEnglishType | PalermitanoType
}

export const initialState: LanguageReducer = {
  selected: 'browser'
}

const language = (
  state: LanguageReducer = initialState,
  {type, payload} : {type: string, payload?: any}
): LanguageReducer => {
  switch (type) {
    case CHANGE_LANGUAGE: {
      const {selected} = payload
      return {selected}
    }
    default: {
      return state
    }
  }
}

export default language

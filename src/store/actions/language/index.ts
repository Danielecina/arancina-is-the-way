type changeLanguageType = {
  type: string,
  payload: Record<string, {
    selected: string,
    locale: string
  }>
}

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export function changeLanguage (selected, locale): changeLanguageType {
  return {
    type: CHANGE_LANGUAGE,
    payload: {selected, locale}
  }
}

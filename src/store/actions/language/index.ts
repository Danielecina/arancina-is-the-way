type changeLanguageType = {
  type: string,
  payload: Record<string, {
    selected: string
  }>
}

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export function changeLanguage (selected): changeLanguageType {
  return {
    type: CHANGE_LANGUAGE,
    payload: {selected}
  }
}

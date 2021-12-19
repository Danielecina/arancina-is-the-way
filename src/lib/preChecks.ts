import wordListToRewrite from './wordListToRewrite'

const getMatches = (element: Node | HTMLElement): boolean => wordListToRewrite.some(({wrongWord}) => {
  const regex = new RegExp(wrongWord, 'gi')
  return (element.textContent || '').match(regex)
})

export function hasSomeWrongWord (element: Node | HTMLElement | HTMLBodyElement): boolean {
  return getMatches(element)
}

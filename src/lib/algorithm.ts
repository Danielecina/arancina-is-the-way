import wordListToRewrite from './wordListToRewrite'
import nodeTypeToEvaluate from './nodeTypeToEvaluate'

export function findElementsWithWrongWordAndReplace (element?: Node | HTMLElement): boolean | undefined {
  if (!element) return false
  element.childNodes.forEach(findElementsWithWrongWordAndReplace)

  if (!element.textContent || !nodeTypeToEvaluate(element.nodeType, element.nodeName)) {
    return false
  }

  wordListToRewrite.forEach(({wrongWord, correctWord}) => {
    const regex = new RegExp(wrongWord, 'g')
    const matches = (element.textContent || '').match(regex)
    if (matches) {
      element.textContent = (element.textContent || '').replace(regex, correctWord)
    }
  })
  return true
}

export default function algorithm (element?: Node): boolean | undefined {
  if (element) {
    return findElementsWithWrongWordAndReplace(element)
  }

  const rootElement = document.querySelector('body')
  if (!rootElement) return false

  return findElementsWithWrongWordAndReplace(rootElement)
}

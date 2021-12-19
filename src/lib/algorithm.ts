import wordListToRewrite from './wordListToRewrite'
import nodeTypeToEvaluate from './nodeTypeToEvaluate'
import {hasSomeWrongWord} from './preChecks'

export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function findElementsWithWrongWordAndReplace (element: Node | HTMLElement): boolean {
  element.childNodes.forEach(findElementsWithWrongWordAndReplace)

  if (!element.textContent || !nodeTypeToEvaluate(element.nodeType, element.nodeName)) {
    return false
  }

  wordListToRewrite.forEach(({wrongWord, correctWord}) => {
    const regex = new RegExp(wrongWord, 'gi')
    const matches = (element.textContent || '').match(regex)
    if (Array.isArray(matches)) {
      matches.forEach(match => {
        const firstChar = match[0]
        const otherChar = match.slice(1)
        const isCapitalize = firstChar === firstChar.toUpperCase() && otherChar === otherChar.toLowerCase()
        if (isCapitalize) {
          element.textContent = (element.textContent || '').replace(regex, capitalizeFirstLetter(correctWord))
          return
        }

        const isUppercase = match === match.toUpperCase()
        if (isUppercase) {
          element.textContent = (element.textContent || '').replace(regex, correctWord.toUpperCase())
          return
        }

        element.textContent = (element.textContent || '').replace(regex, correctWord)
      })
    }
  })
  return true
}

export default function algorithm (): boolean {
  const body = document.querySelector('body')
  if (!body) {
    return false
  }

  const hasSomeWrongWordToReplace = hasSomeWrongWord(body)
  if (!hasSomeWrongWordToReplace) {
    return false
  }

  findElementsWithWrongWordAndReplace(body)

  return true
}

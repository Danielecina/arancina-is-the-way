import wordListToRewrite from './wordListToRewrite'
import nodeTypeToEvaluate from "./nodeTypeToEvaluate"

function findElementsWithWrongWordAndReplace (element: Node) {
  if (!element) return
  element.childNodes.forEach(findElementsWithWrongWordAndReplace)
  
  if (
    !element.textContent &&
    !nodeTypeToEvaluate(element.nodeType, element.nodeName)
  ) return
  
  wordListToRewrite.forEach(({wrongWord, correctWord}) => {
    const regex = new RegExp(wrongWord, 'g')
    const matches = (element.textContent || '').match(regex)
    if (matches) {
      element.textContent = (element.textContent || '').replace(regex, correctWord)
    }
  })
}

type ErrorsFound = number

function countErrorsOnPage (element?: Node): ErrorsFound {
  let count = 0
  if (!element) {
    return count
  }
  
  wordListToRewrite.map(({wrongWord}) => {
    const regex = new RegExp(wrongWord, 'g')
    const matches = (element.textContent || '').match(regex) || []
    count += matches.length
  })
  
  return count
}

interface Algorithm {
  errorsCount: ErrorsFound
}

export default function algorithm (element?: Node): Algorithm  {
  if (element) {
    const errorsCount = countErrorsOnPage(element)
    if (errorsCount === 0) {
      return {errorsCount}
    }

    findElementsWithWrongWordAndReplace(element)
  }
  
  const rootElement = document.querySelector('body')
  if (!rootElement) {
    console.log('no rootElement selected')
    return {errorsCount: 0}
  }
  
  const errorsCount = countErrorsOnPage(rootElement)
  findElementsWithWrongWordAndReplace(rootElement)
  return {errorsCount}
}

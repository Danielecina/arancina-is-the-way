import wordListToRewrite from './wordListToRewrite'
import nodeTypeToEvaluate from "./nodeTypeToEvaluate"
import countErrorsOnPage, {ErrorsFound} from "./countErrorsOnPage"

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

export interface Algorithm {
  errorsCount: ErrorsFound
}

export default function algorithm (element?: Node): Algorithm  {
  console.log('[START Algorithm]')
  if (element) {
    let errorsCount = countErrorsOnPage(element)
    if (errorsCount === 0) {
      return {
        errorsCount
      }
    }
    findElementsWithWrongWordAndReplace(element)
    return {errorsCount}
  }
  
  const rootElement = document.querySelector('body')
  if (!rootElement) {
    console.log('no rootElement selected')
    return {
      errorsCount: 0
    }
  }
  
  const errorsCount = countErrorsOnPage(rootElement)
  console.log('[ERRORS COUNT]', errorsCount)
  findElementsWithWrongWordAndReplace(rootElement)

  return {
    errorsCount
  }
}

import wordListToRewrite from './wordListToRewrite'
import nodeTypeToEvaluate from "./nodeTypeToEvaluate"
import countErrorsOnPage from "./countErrorsOnPage"

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

export default function algorithm (element?: Node)  {
  let errorsCount
  if (element) {
    errorsCount = countErrorsOnPage(element)
    findElementsWithWrongWordAndReplace(element)
    return {
      errorsCount
    }
  }
  
  const rootElement = document.querySelector('body')
  if (!rootElement) return {}
  
  errorsCount = countErrorsOnPage(rootElement)
  findElementsWithWrongWordAndReplace(rootElement)
  return {
    errorsCount
  }
}

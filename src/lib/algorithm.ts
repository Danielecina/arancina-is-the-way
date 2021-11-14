import wordListToRewrite from './wordListToRewrite'
import nodeTypeToEvaluate from "./nodeTypeToEvaluate"

function findElementsWithWrongWordAndReplace (element: Node | HTMLElement) {
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
  if (element) {
    findElementsWithWrongWordAndReplace(element)
    return
  }
  
  const rootElement = document.querySelector('body')
  if (!rootElement) return
  
  findElementsWithWrongWordAndReplace(rootElement)
}

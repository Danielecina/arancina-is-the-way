import wordListToRewrite from "./wordListToRewrite";

export type ErrorsFound = number

export default function countErrorsOnPage (element?: Node): ErrorsFound {
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

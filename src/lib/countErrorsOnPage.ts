import wordListToRewrite from "./wordListToRewrite"

export default function countErrorsOnPage (element?: Node) {
  console.log("countErrorsOnPage starting", !element)
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

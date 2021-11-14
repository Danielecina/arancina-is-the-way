import wordReplacerAlgorithm from './algorithm'

export let listener: MutationObserver

export function unsubscribeListener() {
  listener && listener.disconnect()
}

const MUTATION_OBSERVER_CHARACTER_DATA = 'characterData'
const MUTATION_OBSERVER_CHILD_LIST = 'childList'
export function mutationRecord (mutation: MutationRecord) {
  if (mutation.type === MUTATION_OBSERVER_CHARACTER_DATA) {
    wordReplacerAlgorithm(mutation.target)
  } else if (mutation.type === MUTATION_OBSERVER_CHILD_LIST) {
    // monitor the target node (and, if subtree is true, its descendants)
    // for the addition of new child nodes or removal of existing child nodes
    const changedNode = mutation.addedNodes[0]
    wordReplacerAlgorithm(changedNode)
  }
}

export function createListener() {
  listener = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach(mutationRecord)
  })
  
  listener.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true
  })
}

export default function mutationObserver(watchMode: boolean): undefined {
  if (!watchMode) {
    unsubscribeListener()
    return
  }
  
  wordReplacerAlgorithm()
  if (listener) return
  createListener()
}

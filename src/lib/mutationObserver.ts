import wordReplacerAlgorithm from './algorithm'

export let listener: MutationObserver | undefined

const MUTATION_OBSERVER_CHARACTER_DATA = 'characterData'
const MUTATION_OBSERVER_CHILD_LIST = 'childList'
export function mutationRecords (mutations: MutationRecord[]) {
  mutations.forEach((mutation: MutationRecord) => {
    if (mutation.type === MUTATION_OBSERVER_CHARACTER_DATA) {
      wordReplacerAlgorithm(mutation.target)
    } else if (mutation.type === MUTATION_OBSERVER_CHILD_LIST) {
      // monitor the target node (and, if subtree is true, its descendants)
      // for the addition of new child nodes or removal of existing child nodes
      const changedNode = mutation.addedNodes[0]
      wordReplacerAlgorithm(changedNode)
    }
  })
}

export function createListener (): boolean {
  if (listener) return false

  listener = new MutationObserver(mutationRecords)

  listener.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true
  })

  return true
}

export function unsubscribeListener () {
  listener && listener.disconnect()
  listener = undefined
}

export default function mutationObserver (watchMode: boolean): undefined {
  if (!watchMode) {
    unsubscribeListener()
    return
  }

  wordReplacerAlgorithm()
  createListener()
}

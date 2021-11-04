import debounce from 'lodash/debounce'

let listener: MutationObserver

type Callback = (changedNode?: any) => void

const MUTATION_OBSERVER_CHARACTER_DATA = 'characterData'
const MUTATION_OBSERVER_CHILD_LIST = 'childList'

function unsubscribeListener() {
  console.log('unsubscribe listener...')
  if (listener) {
    listener.disconnect()
    console.log('disconnected listener done')
    return
  }
  
  console.log('No listener found')
  return
}

function mutationRecord (mutation: MutationRecord, callbackIsEnabled: Callback) {
  console.log('mutation observer see a mutation...', mutation)
  
  if (mutation.type === MUTATION_OBSERVER_CHARACTER_DATA) {
    callbackIsEnabled(mutation.target)
  } else if (mutation.type === MUTATION_OBSERVER_CHILD_LIST) {
    // monitor the target node (and, if subtree is true, its descendants)
    // for the addition of new child nodes or removal of existing child nodes
    const changedNode = mutation.addedNodes[0]
    callbackIsEnabled(changedNode)
  }
}

export default function mutationObserver(isEnabled: boolean, callbackIsEnabled: Callback): undefined {
  if (!isEnabled) {
    unsubscribeListener()
    return
  }
  
  console.log('invoke callback')
  callbackIsEnabled()
  
  if (listener) {
    console.log('listener is already registered', listener)
    return
  }
  
  console.log('subscribe listener')
  // each tab page need to set a mutation observer to work
  listener = new MutationObserver(debounce((mutations: MutationRecord[]) => {
    mutations.forEach(mutation => mutationRecord(mutation, callbackIsEnabled))
  }, 300))
  
  listener.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true
  })
}

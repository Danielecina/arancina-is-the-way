import debounce from 'lodash/debounce'

import wordReplacerAlgorithm from './algorithm'

export let listener: MutationObserver | undefined

export const mutationRecords = debounce((mutations: MutationRecord[]) => {
  wordReplacerAlgorithm()
}, 500)

export function createListener (): boolean {
  const body = document.querySelector('body')
  if (listener || !body) {
    return false
  }

  listener = new MutationObserver(mutationRecords)
  listener.observe(body, {
    childList: true,
    characterData: true,
    subtree: true
  })

  return true
}

export function unsubscribeListener (): void {
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

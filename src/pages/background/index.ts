import debounce from 'lodash/debounce'

import reducers from '../../store/reducers'
import RxJsStore, {State, START_UP_STORE} from '../../store/RxJsStore'
import {getCurrentTabUId, sendMessage} from '../../lib/chromeUtils'
import {ChromeMessage, Sender} from "../../types"
import mutationObserver from '../../lib/mutationObserver'
import wordReplacerAlgorithm from '../../lib/algorithm'
import {TOGGLE_WATCH_MODE} from "../../store/actions/substitution";

const ON_BROWSER_PAGE_CHANGE = 'ON_BROWSER_PAGE_CHANGE'
const DEBOUNCE_TIME = 300

chrome.runtime.onInstalled.addListener(({
  reason, previousVersion, id
}: {
  reason: string,
  previousVersion?: string | undefined,
  id?: string | undefined
}) => {
  alert(`
    [Background] [onInstalled]
    ${reason} ${previousVersion} ${id}
  `)
})

// when user switch tab, trigger this background event
chrome.tabs.onActivated.addListener(debounce(({tabId}) => {
  chrome.storage.sync.get(null, watchModeMessage)
}, DEBOUNCE_TIME))

// Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading
chrome.webNavigation.onDOMContentLoaded.addListener(debounce(({tabId}) => {
  chrome.storage.sync.get(null, watchModeMessage)
}, DEBOUNCE_TIME))

function watchModeMessage(store: State) {
  if (!store.substitution?.watchMode) return
  console.log('get storage to check watchMode', store.substitution?.watchMode)

  sendMessage({
    from: Sender.BACKGROUND,
    type: TOGGLE_WATCH_MODE,
    payload: {watchMode: store.substitution?.watchMode},
  }, (data) => {
    console.log('[sendMessage response callback background]', data)
  })
}

export default {};

import debounce from 'lodash/debounce'

import {State} from '../../store/RxJsStore'
import {sendMessage} from '../../lib/chromeUtils'
import {Sender} from "../../types"
import {TOGGLE_WATCH_MODE} from "../../store/actions/substitution";

const DEBOUNCE_TIME = 300

chrome.runtime.onInstalled.addListener(({
  reason, previousVersion, id
}: {
  reason: string,
  previousVersion?: string | undefined,
  id?: string | undefined
}) => {
  alert(`
    [Application installed]
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
    // set del count degli errori sullo store...
    // serve per la gamification
  })
}

export default {};

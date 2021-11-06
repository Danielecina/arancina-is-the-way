import debounce from 'lodash/debounce'

import reducers from '../../store/reducers'
import RxJsStore, {State, START_UP_STORE} from '../../store/RxJsStore'
import {getCurrentTabUId} from '../../lib/chromeUtils'
import {Sender} from "../../types"
import {DEBOUNCE_TIME} from '../../constants'

const CHANGE_PAGE = 'CHANGE_PAGE'

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
  chrome.storage.sync.get(null, store => watchModeMessage(store, tabId))
}, DEBOUNCE_TIME))

// Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading
chrome.webNavigation.onDOMContentLoaded.addListener(debounce(({tabId}) => {
  chrome.storage.sync.get(null, store => watchModeMessage(store, tabId))
}, DEBOUNCE_TIME))

function watchModeMessage(store: State, tabId: number) {
  console.log('get storage to check watchMode', store)
  if (store.watchMode) {
    // chrome.tabs.sendMessage(tabId, {
    //   from: Sender.BACKGROUND,
    //   type: CHANGE_PAGE,
    //   payload: {watchModeMessage: 'watchModeMessage'}
    // })
  }
}

export default {};

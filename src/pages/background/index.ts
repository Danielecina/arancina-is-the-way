import debounce from 'lodash/debounce'

import reducers from '../../store/reducers'
import RxJsStore, {State, START_UP_STORE} from '../../store/RxJsStore'
import {getCurrentTabUId} from '../../lib/chromeUtils'
import {Sender} from "../../types"
import {DEBOUNCE_TIME} from '../../constants'

chrome.runtime.onInstalled.addListener((details) => {
  alert("[onInstalled] success")
  
  chrome.storage.sync.get(null, store => {
    console.log('chrome store', store)
    getCurrentTabUId((id) => {
      console.log('chrome tab id', id)
      if (!id) return
      const storageInstance = new RxJsStore(reducers, {pippo: 'test'})
      console.log('store instance', storageInstance)

      chrome.tabs.sendMessage(id, {
        from: Sender.Background,
        type: START_UP_STORE,
        payload: storageInstance
      })
    })
  })
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
  // if (store.watchMode) {
  chrome.tabs.sendMessage(tabId, {
    from: Sender.Background,
    type: START_UP_STORE,
    payload: {watchModeMessage: 'watchModeMessage'}
  })
  // }
}

export default {};

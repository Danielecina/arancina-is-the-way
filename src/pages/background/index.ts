import debounce from 'lodash/debounce'

import watchModeMessage from './watchModeMessage'

const DEBOUNCE_TIME = 300

chrome.runtime.onInstalled.addListener(({reason, previousVersion, id}: {
  reason: string,
  previousVersion?: string | undefined,
  id?: string | undefined
}) => {
  // eslint-disable-next-line no-console
  console.log(reason, previousVersion, id)
})

// when user switch tab, trigger this background event
chrome.tabs.onActivated.addListener(debounce(({tabId}) => {
  chrome.storage.sync.get(null, watchModeMessage)
}, DEBOUNCE_TIME))

// Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading
chrome.webNavigation.onDOMContentLoaded.addListener(debounce(({tabId}) => {
  chrome.storage.sync.get(null, watchModeMessage)
}, DEBOUNCE_TIME))

export default {}

import {ChromeMessage} from '../types'

const queryInfo = {active: true};
export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
  chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
    callback(tabs[0].url);
  });
}

export const getCurrentTabUId = (callback: (url: number | undefined) => void): void => {
  chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
    const tabId = tabs[0] || {}
    callback(tabId.id);
  });
}

export const sendMessage = (message: ChromeMessage) => {
  let response
  getCurrentTabUId(tabId => {
    console.log('sendMessage tabId', tabId)
    tabId && chrome.tabs.sendMessage(
      tabId,
      message,
      {},
      (data) => (response = data)
    )
  })
  return response
}



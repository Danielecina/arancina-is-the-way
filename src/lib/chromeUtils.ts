import {ChromeMessage} from '../types'

const queryInfo = {active: true};

export const getCurrentTabUId = async (): Promise<number | undefined> => {
  const [tab] = await chrome.tabs.query(queryInfo)
  return tab.id
}

export const sendMessage = async (message: ChromeMessage): Promise<any> => {
  const tabId = await getCurrentTabUId()
  return await new Promise((resolve, reject) => {
    if(!tabId) {
      reject('missing tabId')
      return
    }
  
    chrome.tabs.sendMessage(tabId, message, {}, resolve)
  })
}



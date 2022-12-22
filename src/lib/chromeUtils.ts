import {ChromeMessage} from '../types'

const queryInfo = {active: true}

export const getCurrentTabUId = async (): Promise<number | undefined> => {
  const [tab] = await chrome.tabs.query(queryInfo)
  return tab.id
}

export const createNewTab = async (url): Promise<void> => {
  await new Promise((resolve) => {
    chrome.tabs.create({url}, resolve)
  })
}

export const sendMessage = async (message: ChromeMessage): Promise<any> => {
  const tabId = await getCurrentTabUId()
  return await new Promise((resolve, reject) => {
    if (!tabId) {
      reject(new Error('missing tabId'))
      return
    }

    chrome.tabs.sendMessage(tabId, message, resolve)
  })
}

import {ChromeMessage} from '../types'

const queryInfo = {active: true}

export const getCurrentTabUId = async (): Promise<number | undefined> => {
  const [tab] = await chrome.tabs.query(queryInfo)
  return tab.id
}

export const createNewTab = async (url) => {
  await new Promise((resolve, reject) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError.message)
    }
    chrome.tabs.create({url}, resolve)
  })
}

export const sendMessage = async (message: ChromeMessage): Promise<any> => {
  const tabId = await getCurrentTabUId()
  return new Promise((resolve, reject) => {
    if (!tabId) {
      reject(new Error('missing tabId'))
      return
    }

    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError.message)
    }

    chrome.tabs.sendMessage(tabId, message, {}, resolve)
  })
}

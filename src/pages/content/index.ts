/* Content is the unique file that have access to dom element */
import {ChromeMessage, Sender} from "../../types";

import mutationObserver from '../../lib/mutationObserver'
import wordReplacerAlgorithm from '../../lib/algorithm'

interface Result {
  payload?: any
  message?: any
}

function appEventHandler(
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: (result?: Result) => void
) {
  const {payload = {}, type} = message
  console.log('[EVENT]', message)
  switch (type) {
    case 'TOGGLE_WATCH_MODE': {
      const {watchMode: isEnabled} = payload
      try {
        mutationObserver(isEnabled, wordReplacerAlgorithm)
        response({message: `watch mode ${isEnabled ? 'starting' : 'disabled'}`})
      } catch (error) {
        response({message: `watch mode error: ${error}`})
      }
      break
    }
    case 'FIX_WORDS': {
      try {
        const payload = wordReplacerAlgorithm()
        response({payload, message: 'fix words completed'})
      } catch (error) {
        response({message: `fix words error: ${error}`})
      }
      break
    }
    default: {
      response({message: `missing type: ${message.type}`})
      break
    }
  }
}

console.log('[CONTENT.JS] BASE')
chrome.runtime.onMessage.addListener(appEventHandler)

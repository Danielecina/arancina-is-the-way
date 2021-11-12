/* Content is the unique file that have access to dom element */
import {ChromeMessage} from "../../types"
import {TOGGLE_WATCH_MODE, SUBSTITUTE_WORDS} from "../../store/actions/substitution"

import mutationObserver from '../../lib/mutationObserver'
import wordReplacerAlgorithm from '../../lib/algorithm'

interface Result {
  payload?: any
  message?: string
}

function appEventHandler(
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: (result?: Result) => void
) {
  const {payload = {}, type} = message
  switch (type) {
    case TOGGLE_WATCH_MODE: {
      const {watchMode} = payload
      try {
        mutationObserver(watchMode)
        response({message: `watch mode ${watchMode ? 'starting' : 'disabled'}`})
      } catch (error) {
        response({message: `watch mode error: ${error}`})
      }
      break
    }
    case SUBSTITUTE_WORDS: {
      try {
        const {errorsCount} = wordReplacerAlgorithm()
        response({payload: {errorsCount}, message: 'fix words completed'})
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

chrome.runtime.onMessage.addListener(appEventHandler)

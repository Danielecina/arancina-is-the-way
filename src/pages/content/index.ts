/* Content is the unique file that have access to dom element */

// import {ChromeMessage} from "../types";
// import {FIX_WORDS, TOGGLE_WATCH_MODE} from '../actions'
//
// import mutationObserver from '../lib/mutationObserver'
// import wordReplacerAlgorithm from '../lib/algorithm'

// @ts-ignore
// import storeInstance from './background'
// @ts-ignore
// console.log('content', storeInstance)

// interface Result {
//   payload?: any
//   message?: string
// }

import {ChromeMessage, Sender} from "../../types";

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
) => {
  console.log('[content.js]. Message received', {
    message,
    sender,
  })
}

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

// function appEventHandler(
//   message: ChromeMessage,
//   sender: chrome.runtime.MessageSender,
//   response: (result?: Result) => void
// ) {
//   const {payload = {}, type} = message
//   switch (type) {
//     case TOGGLE_WATCH_MODE: {
//       const {watchMode: isEnabled} = payload
//       try {
//         mutationObserver(isEnabled, wordReplacerAlgorithm)
//         response({message: `watch mode ${isEnabled ? 'starting' : 'disabled'}`})
//       } catch (error) {
//         response({message: `watch mode error: ${error}`})
//       }
//       break
//     }
//     case FIX_WORDS: {
//       try {
//         const payload = wordReplacerAlgorithm()
//         response({payload, message: 'fix words completed'})
//       } catch (error) {
//         response({message: `fix words error: ${error}`})
//       }
//       break
//     }
//     default: {
//       response({message: `missing type: ${message.type}`})
//       break
//     }
//   }
// }

const setupListener = () => {
  // chrome.runtime.onMessage.addListener(appEventHandler);
  
  chrome.runtime.onMessage.addListener(() => {
  
  })
}

setupListener()


export default {}

// A basic example how you can use background scripts in your Chrome extension.
// More on: https://developer.chrome.com/docs/extensions/mv2/background_pages/.

import reducers from "../../store/reducers";
import RxJsStore from '../../store/RxJsStore'

window.chrome.runtime.onInstalled.addListener(() => {
  console.log(
    "'Create React Chrome Extension - TypeScript' installed/updated...",
    new RxJsStore(reducers, {}, chrome.storage.sync)
  );
});

export default {};

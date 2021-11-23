<div align="center">

# 🍘 Arancina is the only way 🍘
[![Coverage Status][coverall-svg]][coverall-io]

This Chrome extension was born after a crazy night.
I'm a developer from Palermo, Sicily and in my land we protect with strong passion the word Arancina.
Maybe there isn't really a reason to hate other inflections of this word
but there is something inside me that hurts when I hear it crippled.

This pain also expanded while reading over time
So if you are wondering why this extension exists, I think it is not for you
This extension help all people that, like me, need to resolve this pain.
Enjoy, install it and spread it with the hope that this word will be corrected all over the world!

## 🏢 Architecture
</div>

#### Manifest.json
Manifest.json is the most important part of application configuration.
This file contains the Chrome configuration. You can [see more info here](https://developer.chrome.com/docs/extensions/mv3/intro/)

#### Pages
*Popup* contains the React app code.
*Content* contains all messages listeners. This file is the only that can communicate with and access the user DOM.
*Background* controls the interaction events of users with Chrome tab and send messages to content.ts to trigger specific functionality.

#### Communication from pages
Each file doesn't know what the others do. All logics are connected to `chrome.tabs.sendMessage`.
A message is an action that have an instruction for specific area. It is composed by a type(*required*) and a payload

<div align="center">

## 🤌 Using this extension

</div>

`yarn build`

**Builds the extension** for production to the `build` folder.
It bundles React in production mode and optimizes the build for the best performance.

The build is minified and your extension is ready to be used in Developer mode or published to the Google Web Store!.

`yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### Load extension locally

1. Open the Extension Management page by navigating to [chrome://extensions](chrome://extensions).
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the extension directory and select build folder generate to command build.

[coverall-svg]: https://coveralls.io/repos/github/Danielecina/arancina-is-the-way/badge.svg?branch=main
[coverall-io]: https://coveralls.io/github/Danielecina/arancina-is-the-way?branch=main

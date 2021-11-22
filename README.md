<div align="center">

# 🍘 Arancina is the only way 🍘
[![Coverage Status][coverall-svg]][coverall-io]

This Chrome extension is thinked after a crazy night.
I'm a developer born in Palermo in Sicily and in my land we protect with really passion the word Arancina.
Maybe there isn't really a reason to hate other inflections of this word
but there is something inside me that hurts when I hear this crippled word.

This pain also expanded during reading over time
So if you are wondering why this extension exists I think it is not for you
This extension help all people that, like me, need to resolves this pain.
Enjoy, install and spread with the hope that this word will be corrected

## 🏢 Architecture
</div>

#### Manifest.json
Manifest.json is a most important part of application configuration.
This file contains chrome the configuration. You can [see more info here](https://developer.chrome.com/docs/extensions/mv3/intro/)

#### Pages
*Popup* contains the react app code. 
*Content* contains all messages listerer. This file is the unique that can comunicate and see the user DOM.
*Background* control the interaction event of user with chrome tab and send messages that was listened to content.ts to trigger specific functionality.

#### Communication from pages
Each file doesn't know what the other does. All logics are connected to`chrome.tabs.sendMessage`.
A message is an action that have an instruction for specific area. It is composed from a type(*required*) and a payload

<div align="center">

## 🤌 Using this extension

</div>

`yarn build`

**Builds the extension** for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

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

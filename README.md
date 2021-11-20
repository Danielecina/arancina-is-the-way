<div align="center">

# Arancina is the only way

This Chrome extension is thinked after a crazy night.
I'm a developer born in Palermo in Sicily and in my land we protect with really passion the word Arancina.
Maybe there isn't really a reason to hate other inflections of this word
but there is something inside me that hurts when I hear this crippled word.

This pain also expanded during reading over time
So if you are wondering why this extension exists I think it is not for you
This extension help all people that, like me, need to resolves this pain.
Enjoy, install and spread with the hope that this word will be corrected


[![Build Status][github-actions-svg]][github-actions]
[![Coverage Status][coverall-svg]][coverall-io]

</div>

## Architecture

Add some photo to explain the application architecture.

#### Chrome

Manifest.json is a most important part of application configuration. This file have a configuration of chrome browser.
[See more of this file here](https://developer.chrome.com/docs/extensions/mv3/intro/)

In chrome folder is the output directory where all logic converge
*Content.ts* contains all messages listerer. This file is the unique that can comunicate and see the user DOM.
*Background.ts* control the interaction event of user with chrome tab and send messages that was listened to content.ts to trigger specific functionality.

Each file doesn't know what the other does. All logics are applied to`chrome.tabs.sendMessage`
that trigger a specific event through the `appEventHandler` function using a specific __action Type__.

#### React

The application start to `~/index.js`.
App components contain the starting routing of the application.

## Using this extension

### How to build this extension:

#### `yarn build`

**Builds the extension** for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and your extension is ready to be used in Developer mode or published to the Google Web Store!.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### Open the extension in Developer mode

1. Open the Extension Management page by navigating to [chrome://extensions](chrome://extensions).
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the extension directory.

## Features we would like to add:
If you want to open some pull request to add features this is a list of possible ones

* [ ] Basic Test
* [ ] Performance tests
* [ ] Chrome api mocks to correctly testing output
* [ ] Add counter badge to each wrong word founded
* [ ] Add and save gamification data
* [ ] Add ester egg
* [ ] Add trophy using data saved
    * [ ] Enable auto fixer for first time and fix your first word in page
    * [ ] Search your first time in a page with a wrong word
* [ ] Add secret trophy using data saved
    * [ ] After 100 fixed word after installation get - Iniziato dell'ordine delle Arancine
    * [ ] After 500 fixed word after installation get - Esperto dell'ordine delle Arancine
    * [ ] After 1000 fixed word after installation get - Maestro dell'ordine delle Arancine
    * [ ] After 10000 fixed word after installation get - Gran Maestro dell'ordine delle Arancine
    * [ ] Click the home page arancina 10 times - Arancina's Lover
* [ ] Add Recipes page
* [ ] Add Restaurants where you can eat "Arancine" close to you
* [ ] Add Supports page with github and donation
* [ ] Add support to other browser
* [ ] Add logic to correct correctly phrases and not only the arancina word
* [ ] Add notification to alert the Initiate if recipes is not correct? How?
* [ ] Improve build command to reduce build time
* [ ] Add renovate bot
* [ ] Add errors message logic with action type and frontend
* [ ] When we find word errors on user page, notify user and on click on this notification, scrollIntoView to first fixed word. On click the arrow scroll to next. 


[coverall-svg]: https://coveralls.io/repos/github/danielecina/arancina-is-the-only-way/badge.svg?branch=main
[coverall-io]: https://coveralls.io/github/danielecina/arancina-is-the-only-way

[github-actions-svg]: https://github.com/danielecina/arancina-is-the-only-way/actions/workflows/node.js.yml/badge.svg
[github-actions]: https://github.com/danielecina/arancina-is-the-only-way/actions

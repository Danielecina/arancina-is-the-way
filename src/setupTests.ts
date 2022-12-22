// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

Object.assign(global, require('jest-chrome'))

// @ts-ignore
global.chrome.tabs.query = () => Promise.resolve([{id: 1}])

// remove random class added to component during animation
jest.mock('antd', () => {
  const antd = jest.requireActual('antd')
  antd.theme.defaultConfig.hashed = false
  return antd
})

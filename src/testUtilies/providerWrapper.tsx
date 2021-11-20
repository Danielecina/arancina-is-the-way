import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import {combineReducers, createStore} from 'redux'

import reducers from '../store/reducers'

export function store (mockState) {
  const rootReducer = combineReducers(reducers)
  return createStore(rootReducer, mockState)
}

MockProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialEntries: PropTypes.arrayOf(PropTypes.string).isRequired,
  mockState: PropTypes.object.isRequired
}
export default function MockProvider ({mockState, initialEntries, children}) {
  return (
    <Provider store={store(mockState)}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </Provider>
  )
}

import React from 'react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import {combineReducers, createStore, Store} from 'redux'

import reducers from '../store/reducers'
import IntlWrapper from './intlWrapper'

export function store (mockState): Store {
  const rootReducer = combineReducers(reducers)
  return createStore(rootReducer, mockState)
}

type MockProviderType = {
  initialEntries: Array<string>,
  mockState: Record<string, unknown>
}

const MockProvider: React.FC<MockProviderType> = ({mockState, initialEntries, children}) => {
  return (
    <Provider store={store(mockState)}>
      <MemoryRouter initialEntries={initialEntries}>
        <IntlWrapper>
          {children}
        </IntlWrapper>
      </MemoryRouter>
    </Provider>
  )
}

export default MockProvider

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { default as ConnectedApp } from './App'
import { App } from './App'

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState, applyMiddleware(thunk)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

describe('App', () => {
  const props = {
    addItem: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render - smoke test', () => {
    const wrapper = renderWithRedux(<ConnectedApp />)

    expect(wrapper.baseElement).toMatchSnapshot()
  })

  test('add todo', () => {
    const wrapper = renderWithRedux(<App {...{...props}} />)
    const input = wrapper.getByTestId("add-input")
    const addBtn = wrapper.getByTestId("add-btn")

    fireEvent.change(input, { target: { value: 'test123' } })
    fireEvent.click(addBtn)

    expect(props.addItem).toHaveBeenCalledWith('test123')
  })

  test('not add empty todo', () => {
    const wrapper = renderWithRedux(<App {...{...props}} />)
    const addBtn = wrapper.getByTestId("add-btn")

    fireEvent.click(addBtn)

    expect(props.addItem).not.toHaveBeenCalled()
  })

  test('display errors', () => {
    const errorText = 'Problem loading list'
    const wrapper = renderWithRedux(<App {...{...props, error: errorText}} />)
    const errorEl = wrapper.getByText(errorText)

    expect(errorEl.textContent).toBe(errorText)
  })
})
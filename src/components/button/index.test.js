import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './'

describe('Button', () => {
  test('should render', () => {
    const button = render(<Button type="add">Test</Button>)

    expect(button.baseElement).toMatchSnapshot()
  })

  test('should fire onclick', () => {
    const clickSpy = jest.fn()
    const wrapper = render(<Button type="add" onClick={clickSpy} data-testid="btn">Test</Button>)
    const button = wrapper.getByTestId("btn")

    fireEvent.click(button)

    expect(clickSpy).toHaveBeenCalled()
  })
})
import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input from './'

describe('Input', () => {
  test('should render', () => {
    const wrapper = render(<Input />)

    expect(wrapper.baseElement).toMatchSnapshot()
  })

  test('should fire change event', () => {
    const onChange = jest.fn()

    const wrapper = render(<Input onChange={onChange} data-testid="input"/>)
    const input = wrapper.getByTestId("input")

    fireEvent.change(input, { target: { value: 'test123' } })    

    expect(onChange).toHaveBeenCalledWith('test123')
  })
})
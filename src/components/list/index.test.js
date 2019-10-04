import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import List from './'

describe('List', () => {
  const props = {
    items: [],
    fetchAllListItems: jest.fn(),
    editItem: jest.fn(),
    deleteItem: jest.fn()
  }

  props.fetchAllListItems.mockReturnValue([])

  const mockItems = [{ id: 0, text: 'Todo 1'}, { id: 1, text: 'Todo 2'}]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render items', () => {
    const wrapper = render(<List {...{...props, items: mockItems}} />)

    expect(wrapper.baseElement).toMatchSnapshot()
    expect(props.fetchAllListItems).toHaveBeenCalled()
    expect(wrapper.getAllByTestId('todo-item').length).toBe(mockItems.length)
  })

  test('should display loading state', () => {
    const wrapper = render(<List isFetching={true} {...props} />)

    expect(wrapper.getAllByText('Loading...').length).toBe(1)
  })

  // test('should display error state', () => {
  //   const wrapper = render(<List isFetching={false} error="Error text" {...props} />)

  //   expect(wrapper.getAllByText('Error text').length).toBe(1)
  // })

  test('should edit todo', () => {
    const wrapper = render(<List isFetching={false} {...{...props, items: mockItems}} />)

    const editBtn = wrapper.getAllByTestId("edit-btn")[1]
    
    fireEvent.click(editBtn)

    const input = wrapper.getByTestId("edit-input")
    fireEvent.change(input, { target: { value: 'test123' } })

    fireEvent.click(editBtn)

    expect(props.editItem).toHaveBeenCalledWith(mockItems[1], { text: "test123"})

  })

  test('should cancel edit todo', () => {
    const wrapper = render(<List isFetching={false} {...{...props, items: mockItems}} />)

    const editBtn = wrapper.getAllByTestId("edit-btn")[1]

    fireEvent.click(editBtn)
    const cancelBtn = wrapper.getAllByTestId("delete-btn")[1]
    fireEvent.click(cancelBtn)
    fireEvent.click(editBtn)

    expect(props.editItem).not.toHaveBeenCalled()
  })

  test('should delete todo', () => {
    const wrapper = render(<List isFetching={false} {...{...props, items: mockItems}} />)

    const deleteBtn = wrapper.getAllByTestId("delete-btn")[1]
    fireEvent.click(deleteBtn)

    expect(props.deleteItem).toHaveBeenCalledWith(mockItems[1], 1)
  })
})
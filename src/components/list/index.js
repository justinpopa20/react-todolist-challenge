import React, { Component } from "react";

import './index.css';
import Button from '../button';
import Input from '../input';

class List extends Component {
    state = { itemIdToEdit: '', newText: '' }

    componentWillMount() {
        this.props.fetchAllListItems()
    }

    toggleItemEdit = item => {
        this.setState({ itemIdToEdit: item.id, newText: item.text })
    }

    cancelEdit = () => {
        this.setState({ itemIdToEdit: null, newText: '' })
    }

    handleItemAdd = item => {
        this.props.addItem(item.id, this.state.newText)
    }

    handleItemEdit = item => {
        this.props.editItem(item, { text: this.state.newText })
        this.setState({ itemIdToEdit: null, newText: '' })
    }

    handleItemDelete = (item, index) => {
        this.props.deleteItem(item, index)
    }

    render() {
        const { items, isFetching, error } = this.props
        const { itemIdToEdit, newText } = this.state

        const loadingState = <tr>
            <td>Loading...</td>
        </tr>

        const listEl = (
            items.map((item, index) => {
                const isItemEditing = itemIdToEdit === item.id
                return <tr key={`${item.id}-${item.newId}`}>
                    <td>
                        <div className="todo-item" data-testid="todo-item">
                            <div className="todo-item-content">
                                {isItemEditing ?
                                    <Input
                                        name='itemIdToEdit'
                                        data-testid="edit-input"
                                        value={newText}
                                        onChange={value => this.setState({ newText: value })}
                                    /> : item.text
                                }
                            </div>
                            <div className="todo-item-status">
                                {item.newId && 'Saving...'}
                            </div>
                        </div>
                    </td>
                    <td>
                        <Button type='edit' data-testid="edit-btn" onClick={() => isItemEditing ? this.handleItemEdit(item) : this.toggleItemEdit(item)}>
                            {isItemEditing ? 'OK' : 'Edit'}
                        </Button>
                        <Button type='delete' data-testid="delete-btn" onClick={() => isItemEditing ? this.cancelEdit() : this.handleItemDelete(item, index)}>
                            {isItemEditing ? 'Cancel' : 'Delete'}
                        </Button>
                    </td>
                </tr>
            })
        )

        return (
            <table>
                <thead>
                    <tr>
                        <th width='66%'>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isFetching ? loadingState : listEl}
                </tbody>
            </table>
        );
    }
}

List.defaultProps = {
    items: [],
    isFetching: false,
    error: ''
}

export default List;

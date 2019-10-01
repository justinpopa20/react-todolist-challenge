import React, { Component } from "react";
import { connect } from "react-redux"
import { addItem } from "./actions"

import Input from "./components/input";
import Button from "./components/button";

import List from "./containers/TodoList";

import "./App.css";

export class App extends Component {
    state = { todoText: "" }

    handleInputChange = todoText => {
        this.setState({ todoText })
    }

    handleAddTodo = () => {
        const { todoText } = this.state
        if (!todoText) return

        this.props.addItem(todoText)
        this.setState({ todoText: "" })
    }

    render() {
        return (
            <div className="container">

                <h1>Todo List</h1>

                <div className="add-item-to-list">
                    <Input
                        name="item"
                        data-testid="add-input"
                        placeholder="New Item..."
                        value={this.state.todoText}
                        onChange={this.handleInputChange}
                    />
                    <Button onClick={this.handleAddTodo} type="add" data-testid="add-btn">
                        Add
                    </Button>
                </div>
                <div className="error-container">{this.props.error}</div>
                <List />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.list.error
})

const mapDispatchToProps = dispatch => ({
    addItem: text => dispatch(addItem(text))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

import { connect } from 'react-redux'
import { addItem, editItem, deleteItem, fetchAllListItems } from '../actions'
import TodoList from '../components/list'

const mapStateToProps = state => ({
  items: state.list.items,
  isFetching: state.list.isFetching,
  error: state.list.error
})

const mapDispatchToProps = dispatch => ({
  fetchAllListItems: () => dispatch(fetchAllListItems()),
  addItem: item => dispatch(addItem(item)),
  deleteItem: (item, listIndex) => dispatch(deleteItem(item, listIndex)),
  editItem: (item, newItem) => dispatch(editItem(item, newItem))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
import actionTypes from './types'
import apiMock from '../apiMock'

export const fetchAllListItems = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ITEMS_REQUEST })

    apiMock.getList()
    .then(data => {
      dispatch({ type: actionTypes.FETCH_ITEMS_SUCCESS, items: data })
    })
    .catch(error => {
      dispatch({ type: actionTypes.FETCH_ITEMS_FAILURE, error })
    })
  }
}

export const addItem = text => {
  const itemToAdd = { text, newId: `new-${new Date().getTime()}` }
  return dispatch => {
    dispatch({ type: actionTypes.ADD_ITEM_REQUEST, item: itemToAdd })

    apiMock.addItem(itemToAdd)
    .then(data => {
      dispatch({ type: actionTypes.ADD_ITEM_SUCCESS, item: {...data, newId: itemToAdd.newId} })
    })
    .catch(() => {
      dispatch({ type: actionTypes.ADD_ITEM_FAILURE, item: itemToAdd })
    })
  }
}

export const deleteItem = (itemToDelete, listIndex) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_ITEM_REQUEST, item: itemToDelete })

    apiMock.deleteItem(itemToDelete.id)
    .then(() => {
      dispatch({ type: actionTypes.DELETE_ITEM_SUCCESS, item: itemToDelete })
    })
    .catch(() => {
      dispatch({ type: actionTypes.DELETE_ITEM_FAILURE, item: itemToDelete, listIndex })
    })
  }
}

export const editItem = (itemToEdit, newItem) => {
  return dispatch => {
    dispatch({ type: actionTypes.EDIT_ITEM_REQUEST, item: itemToEdit, newItem })

    apiMock.editItem(itemToEdit.id, newItem)
    .then(data => {
      dispatch({ type: actionTypes.EDIT_ITEM_SUCCESS, item: itemToEdit, newItem: data })
    })
    .catch(() => {
      dispatch({ type: actionTypes.EDIT_ITEM_FAILURE, item: itemToEdit })
    })
  }
}

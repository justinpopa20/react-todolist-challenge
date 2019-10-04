// use this reducer for your todo list reducer...
import listActionTypes from '../actions/types'

export const errorMsg = {
  FETCH: 'We have a problem loading todo list.',
  ADD: 'Todo item could not be added.',
  EDIT: 'Todo item could not be added.',
  DELETE: 'Problem deleting that todo item.',
}

const initialState = {
  items: [],
  error: '',
  isFetching: false
}

const ListReducer = (state = initialState, action) => {
    switch (action.type) {
      case listActionTypes.FETCH_ITEMS_REQUEST:
        return {
          ...state,
          isFetching: true
        }
      case listActionTypes.FETCH_ITEMS_SUCCESS:
        return {
          ...state,
          items: action.items,
          isFetching: false
        }
      case listActionTypes.FETCH_ITEMS_ERROR:
        return {
          ...state,
          error: errorMsg.FETCH,
          isFetching: false
        }
      case listActionTypes.ADD_ITEM_REQUEST:
        return {
          ...state,
          items: [
            ...state.items,
            {
              ...action.item
            }
          ]
        }
      case listActionTypes.ADD_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.map(stateItem => {
            if(stateItem.newId === action.item.newId) {
              return { id: action.item.id, text: action.item.text }
            }
            return stateItem
          })
        }
      case listActionTypes.ADD_ITEM_FAILURE:
        return {
          ...state,
          error: errorMsg.ADD,
          items: state.items.filter(stateItem => stateItem.newId !== action.item.newId)
        }
      case listActionTypes.DELETE_ITEM_REQUEST:
      case listActionTypes.DELETE_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.item.id)
        }
      case listActionTypes.DELETE_ITEM_FAILURE:
        return {
          ...state,
          error: errorMsg.DELETE,
          items: [
            ...state.items.slice(0, action.listIndex),
            action.item,
            ...state.items.slice(action.listIndex)
          ]
        }
      case listActionTypes.EDIT_ITEM_REQUEST:
        return {
          ...state,
          items: state.items.map((item, index) => {
            if (item.id !== action.item.id) {
              return item
            }
        
            return {
              ...action.item,
              ...action.newItem,
              isSaving: true
            }
          })
        }
      case listActionTypes.EDIT_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.map((stateItem, index) => {
            if (stateItem.id !== action.item.id) {
              return stateItem
            }
            return {
              ...action.newItem,
              isSaving: false
            }
          })
        }
      case listActionTypes.EDIT_ITEM_FAILURE:
        return {
          ...state,
          error: errorMsg.EDIT,
          items: state.items.map((item, index) => {
            if (item.id !== action.item.id) {
              return item
            }
        
            return {
              ...action.item,
              isSaving: false
            }
          })
        }
        default:
            return state;
    }
}

export default ListReducer;

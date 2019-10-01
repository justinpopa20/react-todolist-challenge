const API_ROOT = 'http://localhost:3030/todolist'

const api = {
  getList: async () => {
    try {
      let res = await fetch(API_ROOT, {
        method: "GET",
        headers: {}
      })
      return res.json()
    } catch (error) {
      throw error
    }
  },
  addItem: async (itemToAdd) => {
    try {
      let res = await fetch(API_ROOT, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: itemToAdd.text })
      })
      return res.json()
    } catch (error) {
      throw error
    }
  },
  deleteItem: async (id) => {
    try {
      let res = await fetch(`${API_ROOT}/${id}`, {
        method: "DELETE",
        headers: {}
      })
      return res.json()
    } catch (error) {
      throw error
    }
  },
  editItem: async (id, newItem) => {
    try {
      let res = await fetch(`${API_ROOT}/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
      return res.json()
    } catch (error) {
      throw error
    }
  }
}

export default api
let counter = 0

export const addList = (text) => ({
  type: 'ADD_LIST',
  text,
  id: counter++,
  check: false,
  deletestate: false,
})

export const editList = (text, id) => ({
  type: 'EDIT_LIST',
  text,
  id
})

export const deleteList = (id) => ({
  type: 'DELETE_LIST',
  id
})

export const cancelDeleteList = () => ({
  type: 'CANCEL_DELETE_LIST'
})

export const confirmDeleteList = () => ({
  type: 'CONFIRM_DELETE_LIST'
})

export const checkList = (id) => ({
  type: 'CHECK_LIST',
  id
})

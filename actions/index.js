let counter = 0
let notecounter = 0

export const addList = (text) => ({
  type: 'ADD_LIST',
  text,
  id: counter++,
  check: false,
  deletestate: false,
  edit: false,
})

export const editList = (text, id) => ({
  type: 'EDIT_LIST',
  text,
  id,
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

export const createNote = (id) => ({
  type: 'CREATE_NOTE',
  title: '',
  listele: [], 
  id: notecounter++,
  edit: false,
})

export const addNote = (id, props) => ({
  type: 'ADD_NOTE',
  id,
  props
})

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  id,
  props: notecounter--
})

export const editTitle = (id, name) => ({
  type: 'EDIT_TITLE',
  id,
  name
})

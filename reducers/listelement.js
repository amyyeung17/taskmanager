const defaultState = []

const listelement = (state = defaultState, action) => {
  const {
    type, text, title, check, color, deletestate, id
  } = action 
  switch (type) {
    case 'ADD_LIST':
      return [
        ...state, {text, check, color, deletestate, id},
      ]
    case 'DELETE_LIST':
      return state.map(e => {
        if (e.id === id) {
          return {
            ...e, deletestate: !e.deletestate
          }
        }
        return e
      })
    case 'EDIT_LIST':
      console.log(id)
      console.log(state)
      return state.map(e => {
        if (e.id === id) {
          return {
            ...e, text, id
          }
        }
        return e
      })
    case 'CANCEL_DELETE_LIST':
      return state.map(e => {
        return {
          ...e, deletestate: false
        }
      })
    case 'CONFIRM_DELETE_LIST':
      return state.filter(e => !e.deletestate)
    case 'CHECK_LIST':
      return state.map(e => {
        if (e.id === id) {
          return {
            ...e, check: !e.check
          }
        }
        return e
      })
    default: 
      return state
  } 
}

export default listelement
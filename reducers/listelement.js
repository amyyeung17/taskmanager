const defaultState = {}

const listelement = (state = defaultState, action) => {
  const {
    type, text, check, edit, deletestate, id
  } = action 

  switch (type) {
    case 'ADD_LIST':
      return {
        ...state, [id] : {text, check, edit, deletestate, id},
      }
    case 'DELETE_LIST':
      return {
        ...state, [id]: {...state[id], deletestate: !state[id].deletestate}
      }
    case 'EDIT_LIST':
      return {
        ...state, [id]: {...state[id], text: text, edit: !edit}
      }
    case 'CANCEL_DELETE_LIST':
      let n = Object.entries(state).reduce((p, [k ,v]) => {
        return({...p, [k] : {...v, deletestate: false}})
      }, {})
      return n
    case 'CONFIRM_DELETE_LIST':
      const x = Object.entries(state)
      const y = x.filter((key) => {
        return !key[1].deletestate
      })
      const z = Object.fromEntries(y)
      return z
    case 'CHECK_LIST':
      return {
        ...state, [id]: {...state[id], check: !state[id].check}
      }
    default: 
      return state
  } 
}

export default listelement
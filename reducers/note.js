const defaultState = {}

const note = (state = defaultState, action) => {
  const {
    type, title, listele, id, edit
  } = action

  switch(type) {
    case 'CREATE_NOTE':
      return { 
        ...state, [id] : {title, listele, id, edit}
      }
    case 'ADD_NOTE':
      const { props } = action
      return {
        ...state, [id]: {...state[id], listele: [...state[id].listele, props]}
      }
    case 'EDIT_TITLE':
      const { name } = action 
      return {
        ...state, [id]: {...state[id], title: name, edit: !edit}
      }
    case 'DELETE_NOTE':
      let x = false
      let m = Object.entries(state).reduce((p, [k ,v]) => {
        if (parseInt(k) === id) {
          x = true
          return p
        } else {
          if (x) {
            return({...p, [(parseInt(k) - 1)] : {...v, id: (parseInt(k) - 1)}})
          } else {
            return({...p, [k] : {...v,}})
          }
        }
      }, {})
      return m
    default:
      return state
  }

}

export default note
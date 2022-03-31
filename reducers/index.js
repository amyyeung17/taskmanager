import { combineReducers } from 'redux'

import listelement from '../reducers/listelement'
import note from '../reducers/note'

export default combineReducers({
  listelement,
  note
})
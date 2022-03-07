import React from 'react'
import ReactDom from 'react-dom'

import s from 'styled-components'

import Grid from '../components/Grid'
import Calc from '../components/Calc'
import ToDo from '../components/ToDo'

const App = () => {

  return (
    <>
      <Grid />
      <ToDo />
    </>
  )
}

export default App
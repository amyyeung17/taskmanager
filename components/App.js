import React, { useState } from 'react'

import { createGlobalStyle } from 'styled-components'

import {
  BrowserRouter as Router, Routes, Route, Link, useRouteMatch, 
    useParams, useNavigate
} from 'react-router-dom'

import Grid from '../components/Grid'
import Calc from './Calc/Calc'
import ToDo from './Todo/ToDo'
import Menu from '../components/Menu'
import Timer from './Timer/Timer'
import Stopwatch from './Stopwatch/Stopwatch'
import Credits from './Credits/Credits'
import Homepage from './Homepage'

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden
  }
`

const App = () => {
  const [state, setState] = useState('')
  const [home, setHome] = useState(false)

  return (
    <>
      <Router>
        <GlobalStyle />
        {home ? <></> : <Menu state={state} setState={setState} />}
        <Grid />
        <Routes>
          <Route path='/' element={<Homepage setHome={setHome} state={state} setState={setState} />} />
          <Route path='/todo' element={<ToDo />} />
          <Route path='/calculator' element={<Calc />} />
          <Route path='/timer' element={<Timer />} />
          <Route path='/stopwatch' element={<Stopwatch />} />
          <Route path='/credits' element={<Credits />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
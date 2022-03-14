import React, { useState, useEffect, useRef } from 'react'

import s from 'styled-components'

import {
  BrowserRouter as Router, Routes, Route, Link, useRouteMatch, useParams, useNavigate
} from 'react-router-dom'

import Grid from '../components/Grid'
import Calc from '../components/Calc'
import ToDo from '../components/ToDo'
import Menu from '../components/Menu'

const App = () => {


  return (
    <>
      <Router>
        <Menu />
        <Grid />
        <Routes>
          <Route path='/todo' element={<ToDo />} />
          <Route path='/calculator' element={<Calc />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
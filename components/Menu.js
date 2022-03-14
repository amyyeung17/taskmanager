import React, { useState, useEffect } from 'react'
import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useNavigate
} from 'react-router-dom'

const MenuButton = s.button`
  border: 2px solid black; 
  font-family: Avenir;
  height: 50px;
  width: 50px; 
`
const MenuOptions = s.button`
  font-family: Avenir;
  background-color: white;
  width: 50%;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 20%;
    text-underline-offset: .5vh;
  }
`

const DropdownMenu = s.div`
  display: ${props => props.click ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 2px solid gray; 
  font-family: Avenir-Heavy; 
  height: 250px;
  width: 250px; 
`

const Menu = () => {
  const [state, setState] = useState('')
  const [click, setClick] = useState(false)
  const navigate = useNavigate()

  useEffect(async () =>{
    switch(state) {
      case 'todo':
        navigate('/todo')
        break
      case 'calculator':
        navigate('/calculator')
        break
    }
  }, [state])

  return (
    <>
      <MenuButton onClick={() => setClick(!click)}> Menu </MenuButton>
      <DropdownMenu click={click} >
        <MenuOptions onClick={() => setState('todo')}> To-Do </MenuOptions>
        <MenuOptions onClick={() => setState('notes')}> Notes </MenuOptions>
        <MenuOptions onClick={() => setState('timer')}> Timer </MenuOptions>
        <MenuOptions onClick={() => setState('stopwatch')}> Stopwatch </MenuOptions>
        <MenuOptions onClick={() => setState('calculator')}> Calculator </MenuOptions>
        <MenuOptions> Sleep Calculator </MenuOptions>
        <MenuOptions onClick={() => setState('credits')}> Credits </MenuOptions>
      </DropdownMenu>
    </>
  )
}

export default Menu
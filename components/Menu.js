import React, { useEffect } from 'react'
import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useNavigate
} from 'react-router-dom'

const MenuOptions = s.button`
  font-family: Avenir-Medium;
  font-size: 1rem;
  color: rgba(0, 0, 0, .8);
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  height: 3.75rem;
  margin: .5rem;
  aspect-ratio: 4 / 3;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: .5vh;
  text-decoration-thickness: 20%;
  transition: 300ms ease-in-out;
  
  &:hover {
    text-decoration-color: black;
  }
`
const DropdownMenu = s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border: 2px solid gray; 
  height: 4.0rem;
  width: 100vw;
  max-width: 100%;
  background-color: #fcc7b3;
  margin-bottom: 2rem;
`


const Menu = ({state, setState}) => {
  const navigate = useNavigate()

  useEffect(async () =>{
    switch(state) {
      case 'todo':
        navigate('/todo')
        break
      case 'calculator':
        navigate('/calculator')
        break
      case 'timer':
        navigate('/timer')
        break
      case 'credits':
        navigate('/credits')
        break
      case 'stopwatch':
        navigate('/stopwatch')
        break
    }
  }, [state])

  return (
    <>
 
      <DropdownMenu>
        <MenuOptions onClick={() => setState('todo')}> To-Do </MenuOptions>
        <MenuOptions onClick={() => setState('timer')}> Timer </MenuOptions>
        <MenuOptions style={{paddingRight:"1rem"}} onClick={() => setState('stopwatch')}> Stopwatch </MenuOptions>
        <MenuOptions style={{paddingLeft:"1.5rem"}} onClick={() => setState('calculator')}> Calc </MenuOptions>
        <MenuOptions onClick={() => setState('credits')}> Credits </MenuOptions>
      </DropdownMenu>
    </>
  )
}

export default Menu
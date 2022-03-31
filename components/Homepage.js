import React, { useEffect } from 'react'
import s from 'styled-components'

import {
  BrowserRouter as Router, Switch, Route, Link, useRouteMatch,
   useParams, useNavigate, useLocation
} from 'react-router-dom'

import { Base, Container, MenuOptions } from './Style'


const HomeDiv = s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48rem; 
`
const HomeNaviDiv = s.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  height: 80%;
  background-color: #fffde5;
`
const HomeTitle = s.h3`
  font-family: Avenir;
  font-size: 3.5rem
`
const HomeOptions = s(MenuOptions)`
  width: 16rem;
  height: 16rem;
  font-size: 3rem;
  @media only screen and (max-width:1305px) {
    width: 40%;
    aspect-ratio: 3 / 4;
    font-size: 2.8rem;
  }
`

const Homepage = ({setHome, state, setState}) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() =>{
    if (state === '') {
      setHome(true)
    } else {
      setHome(false)
    }
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
      case 'stopwatch':
        navigate('/stopwatch')
        break
    }
  }, [state])

  return (
    <>
      <Container>
        <Base>
          <HomeDiv>
            <HomeTitle> Simple Tools App </HomeTitle>
            <HomeNaviDiv>
              <HomeOptions onClick={() => setState('todo')}> To-Do </HomeOptions>
              <HomeOptions onClick={() => setState('timer')}> Timer </HomeOptions>
              <HomeOptions onClick={() => setState('stopwatch')}> Stopwatch </HomeOptions>
              <HomeOptions onClick={() => setState('calculator')}> Calculator </HomeOptions>
            </HomeNaviDiv>
          </HomeDiv>
        </Base>
      </Container>
    </>
  )
}

export default Homepage
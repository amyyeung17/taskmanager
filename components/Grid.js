/*
Visual guide only 
*/

import React, { useState, useEffect } from 'react'
import s from 'styled-components'

import { limits } from '../components/Sizes'

const Container = s.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
  grid-column-gap: 1%;

  @media only screen and ${ limits.sm } {
    grid-column-gap: 16px;
    grid-template-columns: 16px repeat(8, minmax(52px, 91px)) 16px;
  }

  @media only screen and ${ limits.smscale } {
    grid-column-gap: 16px;
    grid-template-columns: minmax(32px, 184px) repeat(12, 55.3px) minmax(32px, 184px) ;
  }

  @media only screen and ${ limits.laptopfixed } {
    grid-column-gap: 16px;
    grid-template-columns: 184px repeat(12, minmax(55.3px, 78.54px)) 184px;
  }

  @media only screen and ${ limits.laptop } {
    grid-column-gap: 24px;
    grid-template-columns: 1fr repeat(12, 64.66px) 1fr;
  }
`

//columns 
const GridColumn = s.div`
  &.example {
    border: 2px solid black
  }

  &.example2 {
    border: 2px solid orange; 
  }
  
  &.example3 {
    border: 2px solid purple;
  }
`

const GridBody = s.div`
  grid-column: 1/ 11;
  background-color: blue;
  z-index: 5;
`


const Grid = () => {
  const [display, setDisplay] = useState(true)

  return(
    <>
      <button onClick={() => { setDisplay(!display) }}
      style={{zIndex:"1", position:"relative"}}> Toggle helper grid </button>
      {display ? <div style={{position:"absolute", width:'100%', top:"0", left:"0"}}>
        <Container>
          <GridColumn className="example" />
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example2"/>
          <GridColumn className="example" />
          
        </Container>
      </div> : null}
    </>
  )
}

export default Grid
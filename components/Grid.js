/*
Visual guide only 
*/

import React, { useState, useEffect } from 'react'
import s from 'styled-components'

const Container = s.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 12% repeat(12, 1fr) 12%;
  grid-column-gap: 1%;
  z-index: -1;
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
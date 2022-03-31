import React from 'react'
import s from 'styled-components'

import { DisplayBase, TimeDisplay } from '../Style'

const StopDisplay = s(TimeDisplay)`
  font-size: ${props => props.main ? '3.5rem' : '2rem'}
`

const DisplayStopwatch = ({ms, sec, min, hour, main}) => {

  const addZero = (t) => { 
    if (t < 10) {
      return '0' + t
    } 
    return t
  }

  const addMilliZero = (m) => {
    if (m < 100) {
      return '.' + m 
    }
    return m
  }

  return (
    <>
      <DisplayBase>
        <StopDisplay main={main}> { addZero(hour) + ':'}  { addZero(min) }  { addZero(sec) }  
          { addMilliZero(ms) } </StopDisplay>
      </DisplayBase>
    </>
  )
}

export default DisplayStopwatch
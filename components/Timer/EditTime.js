import React, { useState, useEffect } from 'react'
import s from 'styled-components'

import { DisplayDiv, Finish, TimeDisplay } from '../Style'

const TimeHeading = s(TimeDisplay)`
  font-size: 2.25rem
`

const EditTime = ({period, time, setTime}) => {
  const addZero = (t) => { 
    if (t < 10) {
      return '0' + t
    } 
    return t
  }

  const carryOver = () => {
    if (time === 59) {
      setTime(0)
    } else {
      setTime(time + 1)
    }
  }
  const carryUnder = (u) => {
    if (time === 0) {
      setTime(59)
    } else {
      setTime(time - 1)
    }
  }


  return(
    <>
    <DisplayDiv>
      <TimeHeading> { period } </TimeHeading>
      <Finish onClick={() => carryOver()}> {'^'} </Finish>
          <TimeDisplay> { addZero(time) } </TimeDisplay>
      <Finish onClick={() => {time !== 0 ? carryUnder() : ''}}> {'v'} </Finish>
    </DisplayDiv>
    </>
  )
}

export default EditTime
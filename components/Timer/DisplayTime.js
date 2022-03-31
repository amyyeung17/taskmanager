import React from 'react'
import s from 'styled-components'

import { DisplayDiv, DisplayBase, Options, TimeDisplay } from '../Style'

const Overlay = s.div`
  height: 100vh;
  max-height: 100%;
  width: 100vw;
  max-width: 100%; 
  background-color: #FFFFFF;
  opacity: .5;
  z-index: 5; 
  position: absolute;
  left: 0;
  top: 0
`
const AlertBase = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid gray;
  width: 18.5rem;
  aspect-ratio: 3 / 4;
  z-index: 10; 
  box-shadow: 0px 1px 1px rgba(0, 0, 0, .8),
              0px 1px 2px rgba(0, 0, 0, .10),
              0px 4px 8px rgba(0, 0, 0, .12),
              0px 8px 16px rgba(0, 0, 0, .14);
`

const DisplayTime = ({hour, min, sec, input, setInput}) => {


  const addZero = (t) => { 
    if (t < 10) {
      return '0' + t
    } 
    return t
  }

  return(
    <> 
       <DisplayDiv>
        {hour === 0 && min === 0 && sec === 0 ?
          <>
            <Overlay />
            <AlertBase>
              <TimeDisplay> Time's up! </TimeDisplay>
              <Options onClick={() => setInput(!input)}> Done </Options>
            </AlertBase>
          </>
          :
          <>
            <TimeDisplay> Time Remaining: </TimeDisplay>
            <DisplayBase>
              <TimeDisplay> {addZero(hour)} : {addZero(min)} : {addZero(sec)}</TimeDisplay>
            </DisplayBase>
          </>
        }
      </DisplayDiv>
    </>
  )
}

export default DisplayTime
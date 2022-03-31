import React from 'react'
import s from 'styled-components'

import DisplayStopwatch from './DisplayStopwatch'

import { DisplayBase, DisplayDiv, TimeDisplay } from '../Style'

const DisplayTimeLapse = s(TimeDisplay)`
  font-size: 1.8rem;
  opacity: ${props => props.empty ? '.6' : '1'}
`
const DisplayTimeLapseDiv = s(DisplayDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24rem;
  height: 16rem;
  overflow-y: auto;
  background-color: #fffde5;
  border: 2px solid #c8968380;
  margin-bottom: .5rem
`

const DisplayLaps = ({laps}) => {

  const calcMs = (ms) => {
    return Math.floor((ms % (1000)) / 10)
  }
  
  const calcSec = (s) => {
    return Math.floor((s % (1000 * 60)) / 1000)
  }

  const calcMin = (m) => {
    return Math.floor((m % (1000 * 60 * 60)) / (1000 * 60))
  }

  const calcHour = (h) => {
    return Math.floor(h % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
  }

  return (
    <> 
      <DisplayTimeLapseDiv>
        {typeof(laps) !== 'undefined' && laps.length > 0 ?
          laps.map((l, index) => {
            return (
              <DisplayBase key={index}>
                <DisplayTimeLapse> {'Lap ' + index} </DisplayTimeLapse>
                <DisplayStopwatch main={false} ms={calcMs(l)} sec={calcSec(l)}
                  min={calcMin(l)} hour={calcHour(l)} />
              </DisplayBase> 
            )
          })
        :
          <>
            <DisplayTimeLapse empty={true}> Laps displayed here </DisplayTimeLapse>
          </>
        }
      </DisplayTimeLapseDiv>
    </>
  )
}

export default DisplayLaps
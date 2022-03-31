import React, { useState, useEffect } from 'react'
import s, { css } from 'styled-components'

import {  Base, Container, DisplayBase, Finish, Options } from '../Style'

import { limits } from '../Sizes'

import DisplayStopwatch from './DisplayStopwatch'
import DisplayLaps from './DisplayLaps'

const StopwatchBase = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid gray;
  width: 27.5rem;
  aspect-ratio: 3 / 4;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12);

  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale } {
    width: 30rem;
  }
`
const AdjustedStop = s(Options)`
  ${props => props.input ? 
    css`
      margin-top: 1rem;
      width: 10rem;   
    `
    :
    css`
      margin-top: 3rem;
      width: 8rem
    `}
`
const Stopbuttons = s(Finish)`
  height: 3rem;
  width: 10rem;
`

const Stopwatch = () => {
  const [ms, setMil] = useState(0)
  const [sec, setSecs] = useState(0)
  const [min, setMins] = useState(0)
  const [hour, setHour] = useState(0)
  const [laps, setLaps] = useState([])
  const [input, setInput] = useState(true)
  const [begin, setBegin] = useState(null)
  const [dif, setDif] = useState(0)
  const [pause, setPause] = useState(0)
  const [duration, setDuration] = useState(0)
  const [run, setRun] = useState(false)
  const [save, setSave] = useState(false)


  useEffect(() => {
    if (!input) {
      setBegin(new Date())
      setRun(true)
    } else {
      setMil(0)
      setSecs(0)
      setMins(0)
      setHour(0)
      setDuration(0)
      setPause(0)
      setLaps([])
      setBegin(null)
      setDif(0)
    }

  }, [input])

  useEffect(() => {
    if (begin !== null && run) {
      const x = new Date()
      if (pause !== 0) {
        setDuration(x.getTime() - pause + duration)
        setPause(0)
      }
      let y = x.getTime() - begin.getTime() - duration
      const z = y - dif
      if (save) {
        setSave(!save)
        let a = [...laps, y]
        setLaps(a)
      }
      const intervalId = setInterval(() => {
        setMil(Math.floor((y % (1000)) / 10))
        setSecs(Math.floor((y % (1000 * 60)) / 1000))
        setMins(Math.floor((y % (1000 * 60 * 60)) / (1000 * 60)))
        setHour(Math.floor(y % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
        setDif(dif + 10)
      }, 10 - z)
      return () => clearInterval(intervalId)
    }

    if (begin !== null && !run) {
      setPause(new Date().getTime())
    }
  }, [dif, begin, run])

  return(
    <>
      <Container>
        <Base>
        <StopwatchBase>
          <DisplayBase>
            <DisplayStopwatch ms={ms} sec={sec} min={min} hour={hour} main={true} />
          
          </DisplayBase>
            {input ? <></> 
              : 
              <>
                <DisplayLaps laps={laps} />
                <Stopbuttons onClick={() => {run ? setSave(!save) : ''}}> Lap </Stopbuttons>
                <Stopbuttons onClick={() => setRun(!run)}> {run ? 'Stop' : 'Start'} </Stopbuttons>
              </>}
            <AdjustedStop input={input} onClick={() => {setInput(!input)}}>
              {input ? 'Start' : 'Restart'}
            </AdjustedStop>
        </StopwatchBase>
        </Base>
      </Container>
    </>
  )
}

export default Stopwatch
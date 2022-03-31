import React, { useState, useEffect } from 'react'
import s from 'styled-components'

import { Base, DisplayBase, Container, Options} from '../Style'

import { limits } from '../Sizes'

import EditTime from './EditTime'
import DisplayTime from './DisplayTime'

const TimerBase = s.div`
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
const AdjustedOptions = s(Options)`
  margin-top: 1rem
`

const Timer = () => {
  const [sec, setSecs] = useState(0)
  const [min, setMins] = useState(0)
  const [hour, setHour] = useState(0)
  const [input, setInput] = useState(true)
  const [remain, setRemain] = useState(null)
  const [date, setDate] = useState(null)
  const [start, setStart] = useState(null)
  const [dif, setDif] = useState(2000)
  

  useEffect(() => {
    if (!input) {
      const x = new Date()
      setStart(new Date())
      x.setHours(x.getHours() + hour, x.getMinutes() + min, x.getSeconds() + sec)
      setDate(x)
      setDif(2000)
      setRemain((x.getTime() - new Date().getTime()) - 1000)
      
    } else {
      setSecs(0)
      setMins(0)
      setHour(0)
      setRemain(null)
    }

  }, [input])

  useEffect(() => {
    if (!input) {
      const intervalId = setInterval(() => {
        if (remain > -1000) {
          const current = new Date()
          const differ = current.getTime() - start.getTime() - dif
          setSecs(Math.floor((remain % (1000 * 60)) / 1000))
          setMins(Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60)))
          setHour(Math.floor(remain % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
          setDif(1000 + dif)
          setRemain(date.getTime() - current.getTime() + differ)
        }
      }, 1000)

      return () => clearInterval(intervalId)
      }
    }, [remain])
 
  return(
    <>
    <Container>
      <Base>
        <TimerBase>
          <DisplayBase>
            { input ?
            <>
              <EditTime period={'hr'} time={hour} setTime={setHour} />
              <EditTime period={'min'} time={min} setTime={setMins} />
              <EditTime period={'sec'} time={sec} setTime={setSecs} />
            </> 
            :
            <>
            <DisplayTime hour={hour} min={min} sec={sec} date={date} input={input} 
              setInput={setInput} />
            </>
            }   
          </DisplayBase>
          <AdjustedOptions onClick={() => {setInput(!input)}}> {input ? 'Set timer' : 'Cancel'} </AdjustedOptions>
          {input ? <Options onClick={() => {setSecs(0); setMins(0); setHour(0)}}> Clear </Options> : <></>}
        </TimerBase>
      </Base>
    </Container>
    </>
  )
}

export default Timer
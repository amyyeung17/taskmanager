import React  from 'react'
import s from 'styled-components'

import { Header, MenuOptions } from '../Style'
import { limits, size } from '../Sizes'

const PastCalcBase = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid gray; 
  height: 32rem; 
  width: 16rem;
  overflow-y: scroll;
  background-color: white;
  margin: .5rem;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12);
  @media only screen and ${ limits.sm } and (max-width: ${size.smscale}) {
      display: none;
  }
`
const PastCalcGrid = s.div`
  grid-column: 2 / 6;
  grid-row-start: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Together = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Answer = s.div`
  align-self: flex-end;
`
const DisplayFull = s.div`
  font-family: Avenir;
  display: ${props => 13 <= props.length ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  width: 12rem;
  max-height: 0px;
  opacity: 0;
  margin-left: 1.25rem;
  transition: max-height 500ms ease-out, opacity 350ms ease-out;
  overflow-wrap: anywhere;
  font-size: 1rem;
`
const CalcOptions = s(MenuOptions)`
  min-width: 12rem;
  min-height: 3rem;
  max-height: 5rem;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  
  &:hover {
    opacity: .92;   
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  }

  &:hover + ${DisplayFull} {
    transition: max-height 750ms ease-in, opacity 750ms ease-in;
    max-height: 50rem;
    border: 2px solid #c8968380;
    opacity: 1;
  }

`

const PastCalc = ({ pastop, setInput, setDisplay }) => {
  let z = []
  
  const stringSplit = (p) => {
    z = p.split('=')
    return z
  }
  
  const pastCalcElements = pastop.map((p, index) => {

    return (
      <>
        <Together key={index}>
          <CalcOptions onClick={() => {setDisplay(''); setInput(stringSplit(p)[1])}}> { p } </CalcOptions>
          <DisplayFull length={p.length}> 
            {stringSplit(p)[0] + '\n'}
            <Answer>
              {' = ' + stringSplit(p)[1]} 
              </Answer>    
          </DisplayFull>
        </Together>
      </>
    )
  })

  return (
    <>
      <PastCalcGrid>
        <Header> Past calculations </Header>
        <PastCalcBase> {pastop.length!== 0 ? pastCalcElements : <></>} </PastCalcBase>
      </PastCalcGrid>
    </>
  )
}

export default PastCalc
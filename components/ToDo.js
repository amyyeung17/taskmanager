import React, { useState, useEffect, useRef }  from 'react'
import s, { css } from 'styled-components'

const Container = s.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 12% repeat(12, 1fr) 12%;
  grid-column-gap: 1%;
  z-index: -1;
`
const FlexContainer = s.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
const ToDoBase = s.div`
  grid-column-start: 5;
  grid-column-end: 11;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`
const ToColoredBase = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid gray;
  width: 100%;
  aspect-ratio: 3 / 4;
`
const Title = s.div`
  border-bottom: 2px solid black;
  height: 12.5%;
  width: 100%;
`
const TitleText = s.div`
  
`
const StyledButton = s.button`
  font-family: Avenir-Heavy;
  border-radius: 4px;
  height: 75%;
  aspect-ratio: 4 / 3;
  color: white;
`
const Add = s(StyledButton)`
  background-color: #5db067;
`
const Erase = s(StyledButton)`
  background-color: #a24f98; 
`
const Finish = s(StyledButton)`
  background-color: gray;
  height: 65%;
`
const Point = s.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  height: 15%;
  border-bottom: 1.5px solid black;
`
//check guidelines to medium style 
const CheckedBox = s.input.attrs(props => ({type:"checkbox"}))`
  type: checkbox;
  border: 1px solid gray;
  border-radius: 4px;
  height: 25%;
  width: 25%;
`
const HiddenCheckbox = s.input.attrs({type:"checkbox"})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0; 
  position: absolute;
  white-space: nowrap; 
  width: 1px; 
`
const Icon = s.svg`
  fill: none;
  stroke: white; 
  stroke-width: 2px; 
`

const StyledCheckbox = s.div`
  display: inline-block; 
  width: 16px; 
  height: 16px; 
  background: ${props => props.checked ? 'salmon' : 'papayawhip'};
  border-radius: 3px; 
  transition: all 150ms; 

  ${HiddenCheckbox}:focus + &{
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden' }
  }
`


const CheckContainer = s.div`
  display: inline-block;
  vertical-align: middle; 
`

const TypedText = s.input.attrs(props => ({type:"text"}))`
  font-family: Avenir;
  font-size: 1.2em; 
  height: 40%;
  width: 65%;
`
const ShowText = s.p`
  font-family: Avenir; 
  &:hover {
    color: gray;
  }
`
const ToDo = () => {
  const [state, setState] = useState('')
  const [input, setInput] = useState('')
  const [notes, setNote] = useState([])
  const [click, setClick] = useState(true)
  const [check, setCheck] = useState(true)

  const NewNote = ({className, checked, ...props}) => {
    return (
      <>
        <CheckContainer className={className}>
            <HiddenCheckbox checked={checked} {...props}/>
            <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points ="20 6 9 17 4 12"/>
              </Icon>
            </StyledCheckbox>
        </CheckContainer>
      </>
    )
  }

  useEffect(async () => {
    console.log(check)
  }, [state, input, check])

  return(
    <>
      <Container>
        <ToDoBase>
          <ToColoredBase >
            <Title>
              <Erase> - </Erase>
              <Add> + </Add>
            </Title>
            <Point>
              <CheckedBox onChange={() => setCheck(!check)} />
              <TypedText onChange={event => setInput(event.target.value)}/>
            </Point>
            <Point>
              <CheckedBox />
              <TypedText onChange={event => setInput(event.target.value)}
                onMouseEnter={() => setState('hover in')} onMouseLeave={() => setState('hover out')}/>
            </Point>
            <Point>
              {click ? <>
                <TypedText value={input} onChange={event => setInput(event.target.value)}
                onMouseEnter={() => setState('hover in')} onMouseLeave={() => setState('hover out')}/>
                <Finish onClick={() => setClick(!click)}> Finish </Finish>
              </> : 
              <>
                <CheckedBox />
                <ShowText onClick={() => {setClick(!click)}}> { input } </ShowText>
              </>}
            </Point>
            <Point>
              <label>
              <NewNote checked={check} onChange={() => setCheck(!check)} />
              </label>
            </Point>
           
          </ToColoredBase>
        </ToDoBase>
      </Container>
    </>
  )
}

export default ToDo

import React, { useState, useEffect, useReducer}  from 'react'
import s, { css } from 'styled-components'

import Checkbox from '../components/Checkbox'

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
  width: 80%;
  height: 15%;
  border-bottom: 1.5px solid black;
`

const Point2 = s(Point)`
  width: 20%;
`
const CheckedBox = s.input.attrs(props => ({type:"checkbox"}))`
  type: checkbox;
  border: 1px solid gray;
  border-radius: 4px;
  height: 25%;
  width: 25%;
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
//onMouseEnter={() => setState('hover in')} onMouseLeave={() => setState('hover out')} 
//detecting input box
const ListEle = ({ele, edit, erasestate, deletefun, checkfun}) => {
  const [input, setInput] = useState('')
  const [click, setClick] = useState(false)
  console.log(ele)
  console.log(erasestate)

  return(
    <>
        {click  ?  
        <> 
          <label>
            <Checkbox deletefun={deletefun} checkfun={checkfun} erasestate={erasestate} id={ele.id} 
              estate={() => erasestate ? ele.deletestate : ele.check} />
          </label>
          <ShowText onClick={() => {setClick(!click)}}> { ele.text } </ShowText>
        </> : <>
          <TypedText value={input} onChange={event => setInput(event.target.value)}/>
          <Finish onClick={() => {setClick(!click); edit(input, ele.id)}}> Finish </Finish>
        </> }
    </>
  )
}



export default ListEle
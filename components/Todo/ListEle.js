import React, { useState }  from 'react'
import s from 'styled-components'

import Checkbox from './Checkbox'

import { TypedText, Finish } from '../Style'

const Point = s.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 1rem;
  width: 75%;
  height: 15%;
  border-bottom: 1.5px solid black;
`
const CheckContainer = s.div`
  display: flex; 
  width: 25%;
  height: 100%;
  align-items: center;
  justify-content: center;
` 
const TypedTextMenu = s(TypedText)`
  font-size: 1.2em; 
  height: 40%;
`
const ShowText = s.p`
  font-family: Avenir; 
  padding-left: 1rem;
  &:hover {
    color: gray;
  }
`

const ListEle = ({ele, edit, erasestate, deletefun, checkfun}) => {
  const [input, setInput] = useState(ele.text)
  const [click, setClick] = useState(ele.edit)
  const [shake, setShake] = useState(false)
 

  return(
    <>
      <Point>
        {click  ?  
          <> 
            <CheckContainer>
              <label>
                <Checkbox deletefun={deletefun} checkfun={checkfun} erasestate={erasestate} id={ele.id} 
                  estate={() => erasestate ? ele.deletestate : ele.check} />
              </label>
            </CheckContainer>
            <ShowText onClick={() => {setClick(!click)}}> { ele.text } </ShowText>
          </> 
          : 
          <>
            <TypedTextMenu shake={shake} autoFocus value={input} onChange={event => setInput(event.target.value)} />
            <Finish onClick={() => {
              if(input === '') {
                setShake(true)
              } else {
                setShake(false); setClick(!click); setInput(input); edit(input, ele.id)
              }}}> Finish </Finish>
          </>
        }
        </Point>
    </>
  )
}



export default ListEle
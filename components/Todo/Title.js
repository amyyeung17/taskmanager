import React, { useState, useRef, useEffect }  from 'react'
import s from 'styled-components'

import { Finish, TypedText } from '../Style'

const TitleNote = s.h3`
  font-family: Avenir;
  font-size: 1.8rem;
  margin: .5rem;
  margin-left: 2rem;
  transition: 300ms ease-in-out;
  &:hover {
    color: gray;
  }
`
const TypedTextTitle = s(TypedText)`
  font-size: 1.8rem; 
  height: 2.5rem;
  margin-left: 1rem;
`
const TitleDiv = s.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, .5);
  height: 5.75rem;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
              0 2px 2px rgba(0,0,0,0.12);
`

const Title = ({edits, id, note}) => {
  const [input, setInput] = useState(note.title)
  const [edit, setEdit] = useState(note.edit)
  const ref = useRef(null)
  const ref1 = useRef(null)
  
  useEffect(() => {
    const handleOutside = (event) => {
      if (ref.current === document.activeElement && !ref1.current.contains(event.target)) {
        if (ref.current.value === '') {
          setInput('title ' + id)
          edits(id, 'title ' + id) 
        }
         else {
          edits(id, ref.current.value)
         }
        setEdit(!edit)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [edit])
  
  return(
    <>
      <TitleDiv ref={ref1}>
        {edit && note.edit ?
        <>
          <TitleNote onClick={() => {setEdit(!edit)}}> { note.title } </TitleNote>
        </> :
        <>
          <TypedTextTitle autoFocus ref={ref} defaultValue={note.title} onChange={event => setInput(event.target.value)} />
          <Finish onClick={() => {{typeof(input) === 'undefined' || input === '' ? 
            edits(id, 'title ' + id) : edits(id, input)} ; setEdit(!edit)}}>
              Finish 
          </Finish>
        </>
        }
      </TitleDiv>
    </>
  )
}

export default Title
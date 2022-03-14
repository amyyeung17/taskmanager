import React, { useState }  from 'react'
import s, { css } from 'styled-components'

const TitleNote = s.h3`
  font-family: Avenir;
  font-size: 1.8em;
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

const Title = () => {
  const [input, setInput] = useState('')
  const [edit, setEdit] = useState(false)

  return(
    <>
      {edit ?
      <>
        <TitleNote/>
      </> :
      <>
        <TypedText />
      </>
      }
    </>
  )
}

export default Title
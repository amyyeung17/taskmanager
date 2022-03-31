import React from 'react'
import s, { css } from 'styled-components'

import { Direction, DirectionButton, Header, MenuOptions, Options } from '../Style'
import { limits, size } from '../Sizes'

const ToDoOptions = s(MenuOptions)`
  font-family: ${props => (props.nav === props.current) ? 'Avenir-Heavy': 'Avenir-Medium'}; 
  opacity: ${props => (props.nav === props.current) ? '1': '.76'};
  font-size: 1rem;
  box-shadow: ${props => (props.nav === props.current) ? 
                '0px 1px 1px rgba(0, 0, 0, .1), \
                 0px 2px 2px rgba(0, 0, 0, .1), \
                 0px 4px 4px rgba(0, 0, 0, .1);' : 'none'}
`
const DropdownMenu = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border: 2px solid gray; 
  height: 16rem; 
  width: 16rem;
  overflow-y: scroll;
  background-color: white;
  margin: .5rem;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12);
  @media only screen and ${ limits.sm } and (max-width: ${ size.smscale }) {
    display: none; 
  }

  @media only screen and ${ limits.laptop } {
    display:  ${props => props.switchapp ? 'none' : '' }
  }
`
const ToDoNotes = s.div`
  display: flex;
  @media only screen and ${ limits.sm } and (max-width: ${size.smscale}) {
    flex-direcion: row;
    grid-column: 3  / 9;
    justify-content: center;
  }

  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale }  {
    flex-direction: column;
    height: 75vh;
    grid-column: 2 / 6;
    grid-row-start: 1;
    align-items: center;
  }

  @media only screen and ${ limits.laptop } {
    ${props => props.switchapp ? 
      css`
      flex-direction: row;
      grid-column: 2 / 14;
      height: 4rem;
      justify-content: space-evenly;
    `
    :
    ''
    }
  }
`
const NoteMenu = ({note, nav, id, setId, setNav, create, del, winsize, switchapp, setSwitch}) => {
 

  return(
    <>
      <ToDoNotes switchapp={switchapp}>
          <Header switchapp={switchapp}> All Notes </Header>
          <DropdownMenu switchapp={switchapp}>
            {Object.keys(note).length === 0 ?
              <>
              </>
              :
              Object.keys(note).map((k, index) => {
              return(
                <>
                  <ToDoOptions key={index} nav={nav} current={parseInt(k)} onClick={() => setNav(parseInt(k))}> 
                    {note[k].title} 
                  </ToDoOptions>
                </>
              )
            })
            }    
          </DropdownMenu>
        <Direction switchapp={switchapp}>
          <DirectionButton num={nav} onClick={() => {(nav > 0) ? setNav(nav - 1) :''}}> {'<'} </DirectionButton>
          <DirectionButton num={id - nav} onClick={() => {(id > nav) ? setNav(nav + 1) : ''}}> {'>'} </DirectionButton>
        </Direction>
        <Options num={1} onClick={() => {setNav(id + 1); setId(id + 1); create()}}> Add New Note </Options>
        <Options num={id} onClick={() => {
          if (id > 0) {
            if (parseInt(size.laptop) <= winsize + 15 && switchapp) {
              del(id)
              setNav(id - 1)
            } else {
              del(nav)
              if (nav === 0) {
                setNav(0)
              } else {
                setNav(nav - 1)
              }
            } 
            setId(id - 1)
          }  else {
            if (id !== -1 && nav !== -1) {
              del(0)
              setId(-1)
              setNav(-1)
            }
          }
          }}> Delete Note </Options>
        {parseInt(size.laptop) <= winsize ? 
          <Options onClick={()=> setSwitch(!switchapp)}>
            Switch display
          </Options>
          : <> </>}
      </ToDoNotes>
    </>
  )
}

export default NoteMenu
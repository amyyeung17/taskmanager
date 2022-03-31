import React, { useState, useEffect }  from 'react'
import s, { css } from 'styled-components'
import { connect } from 'react-redux'

import { addList, editList, deleteList, cancelDeleteList, 
  confirmDeleteList, checkList, createNote, addNote, editTitle, deleteNote } from '../../actions'

import ListEle from './ListEle'
import Title from './Title'
import NoteMenu from './NoteMenu'

import { NoteSettings, Container } from '../Style'

import { size, limits } from '../Sizes'

const ToDoBase = s.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media only screen and ${ limits.sm } and (max-width: ${size.smscale}) {
      grid-column: 3 / 9;
  }

  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale } {
      grid-column: 7 / 13
  }

  @media only screen and ${ limits.laptop } {
    ${props => props.switchapp ?
      css`
        display: flex;
        grid-column: 2 / 14;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly`
      : 
      'grid-column: 7 / 13'
    }
  }  
`
const NoteDiv = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  min-height: 100px;
`
const EditDiv = s.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 5rem;
  width: 100%;
`
const ToColoredBase = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid gray;
  width: 27.5rem;
  aspect-ratio: 3 / 4;
  max-height: 50rem;
  z-index: 1;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12);

  @media only screen and ${ limits.laptop } {
    ${props => props.switchapp ?
      css`
        margin: .5rem;
        aspect-ratio: 1 / 1;
      `
      :
      ''}
  } 
`


//need to return the length of the redux store
const ToDo = ({dispatchAddList, dispatchDeleteList, dispatchEditList, 
              dispatchCancelList, dispatchConfirmDeleteList, dispatchCheckList,
              dispatchCreateNote, dispatchAddNote, dispatchEditTitle, dispatchDeleteNote, listelement, note}) => {
  const [windowSize, setWindow] = useState('')
  const [erase, setErase] = useState(false)
  const [id, setId] = useState(Object.keys(note).length - 1)
  const [counter, setCounter] = useState(0)
  const [nav, setNav] = useState(0)
  const [switchapp, setSwitch] = useState(false)


  useEffect(() => {
    if (Object.keys(note).length === 0) {
      dispatchCreateNote(id)
    }
  }, [])

  useEffect(() => {
    const resize = () => {
      setWindow(visualViewport.width)
    }
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  const titleComponent = (key) => {
      return(
        <>
        <Title edits={(id, name) => {dispatchEditTitle(id, name)}} key={key} id={key} 
          note={Object.keys(note).length === 0 ? '' : note[key]} />
        </>
      )
  }

  const editComponent = (key) => {
    return (
      <>
        <EditDiv index={key} key={key}>
          {erase ? 
          <>
            <NoteSettings onClick={() => {setErase(!erase); dispatchCancelList()}}> cancel </NoteSettings>
            <NoteSettings onClick={() => {dispatchConfirmDeleteList()}}> delete </NoteSettings>
          </>
          :
          <> 
            <NoteSettings onClick={() => {setErase(!erase)}}> - </NoteSettings>
            <NoteSettings onClick={() => {dispatchAddList(''); setCounter(counter + 1); dispatchAddNote(key, counter)}}> + </NoteSettings>
          </>
          }
        </EditDiv>
      </>
    )
  }

  const itemComponent = (key) => {
    return (
      <>
        <NoteDiv>
          {note[key].listele.map((ele, index) => {
            return (
              <>
                {typeof(listelement[ele]) === 'undefined' ? 
                <>
                </>
                :
                <ListEle style={flexShrink="0"} ele={listelement[ele]} key={index} erasestate={erase} 
                  edit={(text, id) => dispatchEditList(text, id)}
                  deletefun={(id) => dispatchDeleteList(id)}
                  checkfun={(id) => dispatchCheckList(id)} />
                }
              </>
            )})
          }
        </NoteDiv>
      </>
    )
  }

  const CompleteNote = () => {
    if (parseInt(size.laptop) <= (windowSize + 15) && switchapp) {
      return(
        <>
         {Object.keys(note).map((key) => {
            return(
              <>
              <ToColoredBase index={key} switchapp={switchapp}>
                {titleComponent(key)}
                {itemComponent(key)}
                {editComponent(key)}
              </ToColoredBase>
              </>
            )
          })}
        </>
      )
    } else {
      return(
        <>
          <ToColoredBase>
          {titleComponent(nav)}
          {itemComponent(nav)}
          {editComponent(nav)}
          </ToColoredBase>
        </>
      )
    }
  }

  return(
    <>
      <Container>
        <NoteMenu note={note} nav={nav} id={id} setNav={setNav} setId={setId}
          create={() => dispatchCreateNote()} del={(nav) => {dispatchDeleteNote(nav)}}
          winsize={windowSize} switchapp={switchapp} setSwitch={setSwitch} />
        <ToDoBase switchapp={switchapp}>
          {Object.keys(note).length === 0 || id === -1 ?
            <>
            </>
            :
            CompleteNote()
          }  
        </ToDoBase>
      </Container>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchAddList: (text) => dispatch(addList(text)),
  dispatchEditList: (text, id) => dispatch(editList(text, id)),
  dispatchDeleteList: (id) => dispatch(deleteList(id)),
  dispatchCancelList: () => dispatch(cancelDeleteList()),
  dispatchConfirmDeleteList: () => dispatch(confirmDeleteList()),
  dispatchCheckList: (id) => dispatch(checkList(id)),
  dispatchCreateNote: () => dispatch(createNote()),
  dispatchAddNote: (id, props) => dispatch(addNote(id, props)),
  dispatchEditTitle: (id, name) => dispatch(editTitle(id, name)),
  dispatchDeleteNote: (id) => dispatch(deleteNote(id))
})

const mapStateToProps = state => ({
  listelement: state.listelement,
  note: state.note
})


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

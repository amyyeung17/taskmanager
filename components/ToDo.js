import React, { useState, useEffect, useReducer}  from 'react'
import s, { css } from 'styled-components'
import { connect } from 'react-redux'

import { addList, editList, deleteList, cancelDeleteList, 
  confirmDeleteList, checkList } from '../actions'
import listlement from '../reducers/listelement'

import ListEle from '../components/ListEle'

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
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
const TitleNote = s.h3`
  font-family: Avenir;
  font-size: 1.8em;
`

const ToDo = ({dispatchAddList, dispatchDeleteList, dispatchEditList, 
              dispatchCancelList, dispatchConfirmDeleteList, dispatchCheckList, listelement}) => {
  const [state, setState] = useState('')
  const [title, setTitle] = useState('')
  const [erase, setErase] = useState(false)


  useEffect(() => {
    console.log(listelement)
    console.log(erase)
  }, [erase])

  return(
    <>
      <Container>
        <ToDoBase>
          <ToColoredBase >
            <Title>
              {erase ? <Erase onClick={() => {setErase(!erase); dispatchCancelList()}}> cancel </Erase>
              : <Erase onClick={() => {setErase(!erase)}}> - </Erase>
              }
              <TitleNote> Title </TitleNote>
              {erase ? <Add onClick={() => {dispatchConfirmDeleteList()}}> delete </Add>
              : <Add onClick={() => {dispatchAddList('test')}}> + </Add>
              }
            </Title>
      
            {listelement.map((ele, index) => {
              return(
                <>
                  <Point>
                    <ListEle ele={ele} key={index} erasestate={erase} 
                      edit={(text, id) => dispatchEditList(text, id)}
                      deletefun={(id) => dispatchDeleteList(id)}
                      checkfun={(id) => dispatchCheckList(id)}
                     />
                  </Point>
                </>
              )
            })

            }
          </ToColoredBase>
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
  dispatchCheckList: (id) => dispatch(checkList(id))
})

const mapStateToProps = state => ({
  listelement: state.listelement
})


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

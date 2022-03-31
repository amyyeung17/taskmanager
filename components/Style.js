import s, { css, keyframes } from 'styled-components'

import { size, limits } from '../components/Sizes'

export const StyledButton = s.button`
  font-family: Avenir-Heavy;
  border-radius: 4px;
  height: 3rem;
  aspect-ratio: 4 / 3;
  transition: 300ms;
  color: rgba(0, 0, 0, .75);
  margin: .5rem;
  border: none;
  &:hover {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .1),
                0px 2px 2px rgba(0, 0, 0, .1),
                0px 4px 4px rgba(0, 0, 0, .1);
                opacity: .92   
  }
`
export const Finish = s(StyledButton)`
  border: 2px solid #fccab380;
  background-color: #fccab3;
  height: 2.5rem;
`
export const Options = s(StyledButton)`
  background-color: ${props => parseInt(props.num) < 1 ? '#c8968338' : '#c89683'};
  width: 10rem;
  @media only screen and ${ limits.laptop } {
    width: 10rem;
  }
`
export const DirectionButton = s(StyledButton)`
  background-color: ${props => parseInt(props.num) < 1 ? '#c8968338' : '#c89683'};
  width: 3rem;
`
export const NoteSettings = s(StyledButton)`
  border: 2px solid #fccab380;
  background-color: #fccab3;
  font-size: 1.2rem;
  margin-right: 1rem; 
`
const InputError = keyframes`
  0%, 100% {transform: translateX(0);}
  10%, 30%, 50%, 70%, 90% {transform: translateX(-2px);} 
  20%, 40%, 60%, 80% {transform: translateX(2px);} 
`
export const TypedText = s.input.attrs(props => ({type:"text"}))`
  font-family: Avenir;
  border-radius: .25rem;
  border: 2px solid;
  border-color: #c89983;
  width: 65%;
  outline: none;
  transition: 300ms ease;
  &:hover {
    border-color: #c8998392;
  }
  &:focus {
    border-color: #c8998376;
    background-color: #c8998312;
  }
  ${props => props.shake ? 
    css`
      animation: ${InputError} 150ms;
      border-color: #ff6666 `
    : ''}
`
//Probably can remove 
export const ToDoNotes = s.div`
  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale }  {
    display: flex;
    flex-direction: column;
    height: 75vh;
    grid-column: 2 / 5;
    grid-row-start: 1;
  }

  @media only screen and ${ limits.laptop } {
    display: none;
  } 
`

export const Container = s.div`
  display: grid;
  width: 100vw;
  max-width: 100%; 
  height: 100%;
  grid-column-gap: 1%;
  z-index: 5;

  @media only screen and ${ limits.sm } and (max-width: ${size.smscale}) {
    grid-column-gap: 16px;
    grid-template-columns: 16px repeat(8, minmax(57px, 91.125px)) 16px;
  }

  @media only screen and ${ limits.smscale } {
    grid-column-gap: 16px;
    grid-template-columns: minmax(16px, 184px) repeat(12, 55.3px) minmax(16px, 184px);
  }

  @media only screen and ${ limits.laptopfixed } {
    grid-column-gap: 16px;
    grid-template-columns: 184px repeat(12, minmax(55.3px, 78.54px)) 184px;
  }

  @media only screen and ${ limits.laptop } {
    grid-column-gap: 24px;
    grid-template-columns: 1fr repeat(12, 64.66px) 1fr;
  }
`
export const Direction = s.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-evenly;
  width: 10rem;
  @media only screen and ${ limits.sm } and (max-width: ${ size.smscale }) {
    margin-bottom: .5rem;
  }
  @media only screen and ${ limits.laptop } {
    display: ${props => props.switchapp ? 'none' : 'flex'} ;
  }
`
export const TimeDisplay = s.p`
  font-family: Avenir;
  font-size: 3.0rem;
  margin: 1rem;
`
export const DisplayBase = s.div`
  display: flex; 
  flex-direction: row;
`
export const DisplayDiv = s.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
`
export const Base = s.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;

  @media only screen and ${ limits.sm } and (max-width: ${ size.smscale }) {
      grid-column: 3 / 9;
  }

  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale } {
      grid-column: 4 / 12;
  }
`
export const Header = s.h3`
  font-family: Avenir;
  font-size: 2.0rem;
  margin: .5rem;
  @media only screen and ${ limits.sm } and (max-width: ${ size.smscale }) {
    display: none; 
  }
  @media only screen and ${ limits.laptop } {
    display: ${props => props.switchapp ? 'none' : 'block'};
  }
`

export const MenuOptions = s(StyledButton)`
  font-family: Avenir;
  background-color: #fcc9b3;
  width: 10rem;
  flex-shrink: 0;
  margin: 2%;
  margin-left: 1.25rem;
  border: 2px solid #fccab380;
`

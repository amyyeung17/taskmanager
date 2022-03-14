import React, { useEffect, useState }  from 'react'
import s, { css } from 'styled-components'

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

const Checkbox = ({className, checked, checkfun, deletefun, erasestate, estate, id, ...props}) => {


  return (
    <>
      <CheckContainer className={className}>
          <HiddenCheckbox checked={estate()} onChange={() => { {erasestate ? deletefun(id) : checkfun(id)}}}/>
          <StyledCheckbox checked={estate()}>
          <Icon viewBox="0 0 24 24">
              <polyline points ="20 6 9 17 4 12"/>
            </Icon>
          </StyledCheckbox>
      </CheckContainer>
    </>
  )
}

export default Checkbox
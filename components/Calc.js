import React, { useState, useEffect, useRef }  from 'react'
import s from 'styled-components'


const Container = s.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 12% repeat(12, 1fr) 12%;
  grid-column-gap: 1%;
  z-index: -1;
`
const CalcBase = s.div`
  grid-column-start: 5;
  grid-column-end: 11;
`
//can i simplify by adding to calcbase
const FlexContainer = s.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
//aspect-ratio need to come back 
const ActualBase = s.div`
  background-color: pink;
  width: 100%;
  aspect-ratio: 4 / 3;
`
const Text = s.h3`
  font-size: 3.8em;
  font-family: Avenir;
`
const DisplayText = s.p`
  font-size: 2em;
  font-family: Avenir; 
  color: white;
`
const DisplayArea = s.div`
  display: flex; 
  justify-content: flex-end;
  background-color: gray;
  width: 100%;
  height: 20%;
`
const DisplayKeys = s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2%;
  justify-items: center;
  align-items: center;
  height: 80%;
`
const Keypad = s.button`
  border: solid black;
  width: 50%;
  font-size: 1.6em;
  font-family: Avenir-Heavy;
  aspect-ratio: 4 / 3;
`
const DirectionColumnL = s.div`
  grid-column-start: 2;
  grid-column-end: 5;
`
const DirectionColumnR = s.div`
  grid-column-start: 11;
  grid-column-end: 13
`

const Calc = () => {
  const [display, setDisplay] = useState('')
  const [input, setInput] = useState('')
  const [click, setClick] = useState(false)

  let currentString = ''
  let value = []

  const dup = ''

  const keys = ['(', ')', '%', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3',
      '-', '0', '.', '=', '+']

  const keyComponent = keys.map((k, index) => {
    return(
      <>
        <Keypad onClick={() => {setInput(k); setClick(!click)}}
          key={index.uniqueId}> {k} </Keypad>
      </>
    )}) 
    
  //!/\+|\*|\//.test(input) && (input !== '=' && input !== ')' && input !== 'C') - old code that seemed to
  //- gotta google how to use and regex 
  //better to use regex or equality? 
  //replace operation with %?
  // clear all v clear one b one 
  // do not calculate if ending with some operation except
  useEffect(async ()=> {

    if (Number.isInteger(parseInt(input))
      || /\.|\-|\(/.test(input) 
      || (display.length !== 0 
      && !/\+|\*|\/|\-/.test((display.charAt(display.length - 1)))
      && /\+|\*|\/|\%/.test(input) && (!/\=|\)|C/.test(input)))) {
        currentString = display + input
    } else if (input === ')' 
    && (display.match(/\(/g) || []).length >= (display.match(/\)/g) || []).length
    && display.charAt(display.length - 1) !== '(') {
      currentString = display + input
    } else if (input === '=' 
      && (!(isNaN(parseInt(display.charAt(display.length - 1)))) 
        || (display.charAt(display.length - 1)).match(/\.|\%|\)/g))) {
      parse()
      currentString = calculate()
    } else if (input === 'C') {
      currentString = ''
    } else {
      currentString = display;
    }

    setDisplay(currentString)

  }, [input, click])

  const parse = () => {
    currentString = display;


    let counter = 0
    let y = 0
// (/\.|\%/.test(currentString[i]), /\%/g.test(value[counter]) - check global 
    for (let i in currentString) {
      y++
      if (!isNaN(parseInt(currentString[i])) 
        || (currentString[i] === '.' ||currentString[i] === '%')
        || ((counter === 0 || (/\(|\*|\+|\/|\-/.test(value[counter - 1])))
        && currentString[i] === '-' && typeof(value[counter]) === 'undefined')) {
        if (typeof(value[counter]) === 'undefined'){
          value.push(currentString[i])
        } else {
          value[counter] = value[counter] + currentString[i]
          
          if((/\%/g).test(value[counter])) {
            value[counter] = parseFloat(value[counter]) / 100; 
          }
          if((/\-/g).test(value[counter])) {
            value[counter] = Math.abs(parseFloat(value[counter])) * -1 
          }
        }
      } else {
        counter += 2;
        value.push(currentString[i])
       
      }
    }
  }

  const peek = (temp) => {
    return temp.length > 0 ? temp[temp.length - 1] : 'finished'
  }

  const handlezero = (zero) => {
    return /^0$/.test(zero)
  }

  const result = (prev, current, next) => {
    if (!handlezero(current)) {
      current = parseFloat(current)
    } else {
      current = 0
    }
    if (!handlezero(next)) {
      next = parseFloat(next)
    } else {
      next = 0
    }
   let r = 0
    if (prev === '+'){
      r = next + current
    } else if (prev === '-') {
      r = next - current
    } else if (prev === '*') {
      r = next * current
    } else {
      r = next / current
    }
    return r.toString()
  }

  const calculate = () => {
    let operators = []
    let temp = []
    let prev = ''
    let current = ''
    let next = ''

    for (let j = 0; j < value.length ; j++) {
      if ( j === 0 && value[j] === '-' && value[j + 1] === '(') {
        temp.push('0')
        operators.unshift('-')
      }

      if (parseInt(value[j]) || parseFloat(value[j])) {
        temp.push(value[j])
        if (j + 1 < value.length && /\(/.test(value[j + 1])){
          operators.unshift('*')
        }

      } else {
        if (value[j] === '(') {
          operators.unshift(value[j])
          prev = value[j]
        } else if (value[j] === ')') { 
            prev = ')'
            while (prev !== '(') {
              prev = operators.shift()
              if (!/\(|\)/.test(prev)){
                temp.push(prev)
              }
            }

          if (j + 1 < value.length && parseFloat(value[j + 1])){
            operators.unshift('*')
            prev = '*'
          } 

        } else if (((value[j] === '+' || value[j] === '-') 
            && (/\+|\-|\*|\//.test(prev)))
            || (prev === value[j]) && (!/\(|\)/.test(prev)) ){
          temp.push(prev)
          operators.shift()
          operators.unshift(value[j])
          prev = value[j]
        } else {
          if (!/\(|\)/.test(value[j])){
            operators.unshift(value[j])
            prev = value[j]
          }        
        }
      }
    }
 
    temp.push(...operators)
    //tester variable
    let x = 0
    let z = ''

    while(temp.length !== 1 && x < 10) {
      prev = temp.pop()

      if(isNaN(parseInt(prev)) || isNaN(parseFloat(prev))) {
        current = temp.pop()
        if ((parseInt(current) || parseFloat(current || handlezero(current)))
            && (parseInt(peek(temp)) || parseFloat(peek(temp)) || handlezero(peek(temp)))) {
            next = temp.pop()
          temp.unshift(result(prev, current, next))
        } else{
          temp.unshift(prev)
          temp.push(current)
        }
      } else {
        temp.unshift(prev)
      }
      x++;
    }
    return (temp[0]).toString()

  }

  return(
    <>
      <Container>
        <CalcBase>
          <FlexContainer>
              <Text> Test </Text>
              <ActualBase>
                <DisplayArea>
                  <DisplayText>
                    {display}
                  </DisplayText>
                </DisplayArea>
                <DisplayKeys>
                  {keyComponent}
                </DisplayKeys>
              </ActualBase>
          </FlexContainer>
          </CalcBase>
      </Container>
    </>
  )
}

export default Calc
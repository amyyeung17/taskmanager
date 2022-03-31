import React, { useState, useEffect }  from 'react'
import s from 'styled-components'

import { Container, Options } from '../Style'
import { limits, size } from '../Sizes'

import PastCalc from './PastCalc'

const CalcBase = s.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  @media only screen and ${ limits.sm } and (max-width: ${size.smscale}) {
    grid-column: 3 / 9;
  }

  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale } {
      grid-column: 7 / 13
  }
`
const ActualBase = s.div`
  background-color: #c89683;
  width: 27.5rem;
  max-height: 100%;
  aspect-ratio: 3 / 4;
  border: 2px solid #c89683;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12);
`
const DisplayText = s.p`
  font-size: 3em;
  font-family: Avenir; 
  margin-right: .5rem;
`
const DisplayArea = s.div`
  display: flex; 
  justify-content: flex-end;
  background-color: #fffde5;
  width: 100%;
  height: 20%;
  overflow-x: hidden;
`
const DisplayKeys = s.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 80%;
`
const CalcKeys = s(Options)`
  width: 5rem;
  font-size: 2rem;
  background-color: #fccab3;
`
const Calc = () => {
  const [display, setDisplay] = useState('')
  const [input, setInput] = useState('')
  const [click, setClick] = useState(false)
  const [pastop, setPast] = useState([])

  let currentString = ''
  let value = []

  const dup = ''

  const keys = ['(', ')', '%', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3',
      '-', '0', '.', '=', '+']

  const keyComponent = keys.map((k, index) => {
    return(
      <>
        <CalcKeys onClick={() => {setInput(k); setClick(!click)}}
          key={index.uniqueId}> {k} </CalcKeys>
      </>
    )}) 
    
  const peek = (temp) => {
    return temp.length > 0 ? temp[temp.length - 1] : 'finished'
  }

  const testNum = (n) => {
    return /[-+]?([0-9]+([.][0-9]*)?|[.][0-9]+)/.test(n)
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

  useEffect(async ()=> {
    const d = display.length - 1

    if (testNum(input)
      || /\.|\-|\(/.test(input) 
      || (display.length !== 0 
      && !/\+|\*|\/|\-/.test((display.charAt(d)))
      && /\+|\*|\/|\%/.test(input) && (!/\=|\)|C/.test(input)))) {
        currentString = display + input
    } else if (input === ')' 
    && (display.match(/\(/g) || []).length >= (display.match(/\)/g) || []).length
    && display.charAt(d) !== '(') {
      currentString = display + input
    } else if (input === '=' 
      && (!(isNaN(parseInt(display.charAt(d)))) 
        || (display.charAt(d)).match(/\.|\%|\)/g))) {
      parse()
      currentString = calculate()
      let p = [...pastop]
      p.push(display + '=' + currentString)
      setPast(p)
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
        if (j + 1 < value.length && value[j + 1] === '('){
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
              if (!(prev === '(' || prev === ')')) {
                temp.push(prev)
              }
            }

          if (j + 1 < value.length && parseFloat(value[j + 1])){
            operators.unshift('*')
            prev = '*'
          } 

        } else if (((value[j] === '+' || value[j] === '-') 
            && (/\+|\-|\*|\//.test(prev)))
            || (prev === value[j]) && (!(prev === '(' || prev === ')'))) {
          temp.push(prev)
          operators.shift()
          operators.unshift(value[j])
          prev = value[j]
        } else {
          if (!(value[j] === '(' || value[j] === ')')){
            operators.unshift(value[j])
            prev = value[j]
          }        
        }
      }
    }
 
    temp.push(...operators)
    //in case overflow
    let x = 0
    while(temp.length !== 1 && x < 50) {
      prev = temp.pop()
      if(!testNum(prev)) {
        current = temp.pop()
        if (testNum(current) && testNum(peek(temp))) {
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
        <PastCalc pastop={pastop} setInput={setInput} setDisplay={setDisplay} />
        <CalcBase>
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
        </CalcBase>
      </Container>
    </>
  )
}

export default Calc

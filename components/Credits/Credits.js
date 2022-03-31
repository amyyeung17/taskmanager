import React from 'react'
import s from 'styled-components'

import { Container, Base, TimeDisplay } from '../Style'
import { limits } from '../Sizes'

const CreditsBase = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid gray;
  width: 27.5rem;
  aspect-ratio: 3 / 4;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12);

  @media only screen and ${ limits.laptopfixed }, ${ limits.smscale } {
    width: 30rem;
  }
`
const CreditsDisplay = s(TimeDisplay)`
  font-size: 2.5rem;
`

const Credits = () => {
  return (
    <>
    <Container>
      <Base>
      <CreditsBase>
          <CreditsDisplay> Amy Yeung </CreditsDisplay>
      </CreditsBase>
      </Base>
    </Container>
    </>
  )
}

export default Credits
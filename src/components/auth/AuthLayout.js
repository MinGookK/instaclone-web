import { useReactiveVar } from '@apollo/client'
import {
  faFacebookF,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { darkModeOff, darkModeOn, darkModeVar } from '../../apollo'

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`

const Footer = styled.footer`
  margin-top: 20px;
  cursor: pointer;
`

function AuthLayout({ children }) {
  const darkMode = useReactiveVar(darkModeVar)

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer onClick={darkMode ? darkModeOff : darkModeOn}>
        <FontAwesomeIcon icon={darkMode ? faFacebookSquare : faFacebookF} />
      </Footer>
    </Container>
  )
}

export default AuthLayout

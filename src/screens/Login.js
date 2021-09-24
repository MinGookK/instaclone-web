import React from 'react'
import styled from 'styled-components'
import { isLoggedInVar, darkModeVar } from '../apollo'

const Title = styled.h1`
  color: ${props => props.theme.fontColor};
`

const Login = () => {
  return (
    <>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>바로 login하기</button>
    </>
  )
}

export default Login

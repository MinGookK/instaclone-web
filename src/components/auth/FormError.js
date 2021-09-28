import React from 'react'
import styled from 'styled-components'

const SFormError = styled.span`
  font-weight: 600;
  color: tomato;
  font-size: 12px;
  margin: 5px 0px;
`

export default function FormError({ message }) {
  return !message ? null : <SFormError>{message}</SFormError>
}

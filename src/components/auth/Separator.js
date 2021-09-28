import React from 'react'
import styled from 'styled-components'

const Sseparator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.borderColor};
  }
  span {
    text-align: center;
    margin: 0px 10px;
    width: 30%;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`

const Separator = ({ text }) => {
  return (
    <Sseparator>
      <div></div>
      <span>{text}</span>
      <div></div>
    </Sseparator>
  )
}

export default Separator

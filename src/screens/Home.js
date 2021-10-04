import React from 'react'
import { useHistory } from 'react-router'
import { logUserOut } from '../apollo'

const Home = () => {
  const history = useHistory()
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>바로 logout하기</button>
    </>
  )
}

export default Home

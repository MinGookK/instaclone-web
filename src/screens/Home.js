import React from 'react'
import { logUserOut } from '../apollo'

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>바로 logout하기</button>
    </>
  )
}

export default Home

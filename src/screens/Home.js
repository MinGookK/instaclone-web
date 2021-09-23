import React from 'react'
import { isLoggedInVar } from '../apollo'

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>바로 logout하기</button>
    </>
  )
}

export default Home

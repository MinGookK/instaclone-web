import React from 'react'

const Home = ({ setIsLoggedIn }) => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>바로 logout하기</button>
    </>
  )
}

export default Home

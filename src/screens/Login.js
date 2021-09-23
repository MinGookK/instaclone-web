import React from 'react'

// 이런 식으로 props를 계속 전달할 수도 있지만 로그인 외에도 계정을 삭제해도 로그아웃이 되야 하는 등 변수가 되게 많다.
// 그런 경우에 이렇게 무한정 props drilling하는 것은 좋은 방법이 아니다.
// 이번 프로젝트에서는 Apollo client를 사용해서 local state를 가져오는 방법을 사용할 것이다.
const Login = ({ setIsLoggedIn }) => {
  return (
    <>
      <h1>Login</h1>
      <button onClick={() => setIsLoggedIn(true)}>바로 login하기</button>
    </>
  )
}

export default Login

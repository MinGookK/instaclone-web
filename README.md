# instaclone web

## graphql fragment 재활용

쿼리나 뮤테이션을 작성할 때 반복되는 쿼리와 뮤테이션을 fragment로 저장할 수 있는데 이것이 의미가 있을까?
결국에는 fragment가 무엇을 호출했었는지 기억해야 해서 더 헷갈리지 않나? 건호와 이야기를 나누어보자

## fragment에 key 전달하기

map과 같이 컴포넌트를 반복적으로 생성해내는 경우에는 key가 컴포넌트에 꼭 들어가야 한다. (렌더링 성능 문제)
하지만 fragment를 반복적으로 생성할 때는 key를 넣을수가 없는데 이것은 내가 알고 있는 <></>형태가 단축문이었기 때문

```js
import React from 'react'
;<React.fragment key={id}>...어쩌구</React.fragment>
```

와 같이 `React.fragment`를 사용하면 기존의 fragment의 역할을 해내면서 key값을 부여할 수 있다.

## Apollo client 사용하기 (백엔드랑 소통하기)

```js
// apollo.js
export cosnt client = new Apolloclient({
   uri: "[니 서버 주소, 로컬호스트던 뭐든 주소 적기]",
   cache: new InmemoryCache()
})
```

이렇게 apollo.js에서 클라이언트를 생성해주자.
그리고 생성한 client를 ApolloProvider에 전달해주어야 한다.

```js
//App.js
import client from "./apollo.js"

///
<ApolloProvider client={client}>
 <너의 나머지 프로바이더들 + 라우터 + 컴포넌트 등등~~>
<ApolloProvider>
```

이러고 apollo developer tools 열어보면 docs를 열어볼 수 있다 쏘쿨!!

## Using pakages

1. styled component : css를 하기 위해 사용

2. React Hook Form : react 에서 form 작성을 쉽게 해줌

3. React Router : SPA 구현을 위해
   특정 url로 접근을 하면 어떤 component를 보여준다.
   새로고침 되는게 아니라 컴포넌트만 업데이트 해주는거임

4. Apoll Client v3 : backend 연동
5. react helmet : title을 동적으로 변경이 가능하도록 만들어 줌
6. react-fontawesome : 여러 아이콘 이모티콘을 사용하기 위해서

## react hook form

기본 폼
`const {} = useForm();`

원래 react

1. state 만들기
2. onchange 만들어 value 저장하도록 함
3. input이 value를 가지게 함

### register() / watch() / handleSubmit() / formsState

1. register: 상태관리를 알아서 해줌 onchange같은거 안해도 됨. + required, maxlength같은 설정 가능
2. watch: form에 담긴 값을 저장함
3. handleSubmit: 새로고침을 막아주고 form이 유효한지 검사해줌
4. formsState: form이 어떤 상태인지 모든 것을 알 수 있음. 처음에 useForm의 모드를 전달하여 다양하게 사용 가능(맞는 형태일때만 로그인 버튼 활성화, errors는 업데이트 때 여기에 포함됨)

`const { register, watch, handleSubmit } = useForm()`

`<Input ref ={register} name="username" type="text" placeholder="Username" />`
컴포넌트에 ref={register}하면 됨.
name이 반드시 있어야 함

이렇게만 하면 onchange, state, value 모두 관리해줌

그리고 watch() 안에 name을 key로 가지는 객체가 만들어짐

## Helmet Component

## props drilling with reactive variables

props를 전달하는 방법임.
`makeVar()`를 사용하면 상태처럼 관리할 수 있음.

```js
import { makeVar } from '@apollo/client'

export const isLoggedInVar = makeVar(false)
```

이렇게 하면 끝임 어디서든 받아올 수 있음.
다만 component 내부에서 사용하고 싶다면 Hook을 사용해야 함.

```js
import { isLoggedInVar } from './apollo'

const isLoggedIn = useReactiveVar(isLoggedInVar)
```

미쳤다.... 이러면 그냥 props를 관리 안해도 알아서 되는거야...
props drilling 안해도 되고 context를 사용할 필요도 없어...

## style component

### 기본 사용방법

```js
export const [원하는 컴포넌트 이름] = styled.[원하는 htmlTag]`
   css구문들
`
```

이렇게 사용하고 컴포넌트처럼 사용하면 됨.

### props 받기.

styled component는 말 그대로 component이기 때문에 props를 받을 수 있다.
`${ props => props.color }`와 같이 받아와서 동적인 css 할당이 가능하다.
예시는 다음과 같다.

```js
export const Component = styled.h1`
  color: ${props => props.color};
`
```

### ThemeProvider

component에게 Theme 정보를 줄 수 있는 방법
다음과 같이 쓰면 된다.

- Theme을 제공하고자 하는(대부분 최상단)에 <ThemeProvider theme={[테마 정보]}>로 감싸준다.
- Theme 객체를 작성한다.
- 하위 객체에서 Theme 정보를 받아 써먹는다. 끝 ㅋㅋ

Theme 객체는 조또 아니다. 그냥 테마를 전달하기 위해 필요한 props를 모아둔 js 객체이다. css랑 전혀 상관 없는 말로 작성해도 상관없다.

bgColor 같은 css 속성은 없지만 background-color를 표현하기 위해 쉽게 쓴거다. 이렇게 써도 된다는 말.
(사실 fontColor도 없다. 그냥 color임 ㅋ)

```js
export const lightTheme = {
  fontColor: '#2c2c2c',
  bgColor: 'lightgray',
}
export const darkTheme = {
  fontColor: 'lightgray',
  bgColor: '#2c2c2c',
}
```

그래서 이걸 밑처럼 사용하면 된다.
darkMode가 true라면 darkTheme을 아니라면 lightTheme을 하위 컴포넌트들에게 props로 전달할 것이다.

```js
<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
   어쩌구저쩌구 태그들
   <Login />
<ThemeProvider/>
```

그럼 Login Component에서 사용해보자.

```js
const Title = sytled.h1`
   color: ${props => props.theme.fontColor};
`
const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`
const Login = () => {
  return (
    <Container>
      <Title>로그인 페이지 입니다.</Title>
    </Container>
  )
}
```

이런식으로 ThemeProvider로 감싸져 있는 하위 컴포넌트에서 자유롭게 theme 객체를 끌어다 쓸 수 있게 되었다.

### createGlobalStyle

body 전체에 같은 폰트와 배경 색을 지정하고 싶다면 어떻게 해야 할까?
지금의 방법으로는 한가지 컴포넌트에만 css 설정이 가능하기 때문에

동일하고 적용시켜주려면 **모든 컴포넌트에 css작업을 해주어야 한다.**

그래서 사용할 것이 `createClobalStyle`이다.
사용법은 간단하다.

```js
const GlobalStyle = createGlobalStyle`
   body{
      color: 어쩌구;
      background-color: 어쩌구;
   }
   h1{
      font-size: 어쩌구;
   }
`
```

위처럼 작성하고 최상위 컴포넌트에 GlobalStyle 써줘라

```js
<GlobalStyle/>
<원래있었던 태그들 어쩌구저쩌구>
```

이러면 body와 h1에 원하는 css가 전체적으로 자동으로 적용이 된다.

## Setup

- [x] Router
- [x] Authantication
- [x] Architechure
- [x] Styles
- [ ] Log In / Sign Up

  1.  스타일만 먼저 만들기
  2.  from의 로직을 만들기
  3.  실제 Back-end 만들기

- [ ] Feed
- [ ] Profile
- [ ] See Hashtag

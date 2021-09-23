# instaclone web

## Using pakages

1. styled component : css를 하기 위해 사용

2. React Hook Form : react 에서 form 작성을 쉽게 해줌

3. React Router : SPA 구현을 위해
   특정 url로 접근을 하면 어떤 component를 보여준다.
   새로고침 되는게 아니라 컴포넌트만 업데이트 해주는거임

4. Apoll Client v3 : backend 연동
5. react helmet : title을 동적으로 변경이 가능하도록 만들어 줌
6. react-fontawesome : 여러 아이콘 이모티콘을 사용하기 위해서

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

## Setup

- [x] Router
- [ ] Authantication
- [ ] Architechure
- [ ] Styles

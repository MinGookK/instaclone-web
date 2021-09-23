import { useReactiveVar } from '@apollo/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { isLoggedInVar } from './apollo'
import Home from './screens/Home'
import Login from './screens/Login'
import NotFound from './screens/NotFound'

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Login />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App

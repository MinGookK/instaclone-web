import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import NotFound from './screens/NotFound'

function App() {
  let isLogin = true

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLogin ? <Login /> : <Home />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App

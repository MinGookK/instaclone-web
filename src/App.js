import { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import NotFound from './screens/NotFound'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Home setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App

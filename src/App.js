import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { client, darkModeVar, isLoggedInVar } from './apollo'
import Home from './screens/Home'
import Login from './screens/Login'
import NotFound from './screens/NotFound'
import routes from './screens/routes'
import SignUp from './screens/SignUp'
import { darkTheme, GlobalStyles, lightTheme } from './styles'

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const darkMode = useReactiveVar(darkModeVar)

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Switch>
              <Route exact path={routes.home}>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp} component={SignUp} />
              ) : null}
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App

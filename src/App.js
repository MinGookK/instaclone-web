import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { client, darkModeVar, isLoggedInVar } from './apollo'
import Layout from './components/Layout'
import Home from './screens/Home'
import Login from './screens/Login'
import NotFound from './screens/NotFound'
import Profile from './screens/Profile'
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
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp} component={SignUp} />
              ) : null}
              <Route path={`/users/:username`} component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App

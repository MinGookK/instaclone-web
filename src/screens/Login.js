import React from 'react'
import styled from 'styled-components'
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import routes from './routes'
import AuthLayout from '../components/auth/AuthLayout'
import Separator from '../components/auth/Separator'
import Input from '../components/auth/Input'
import FormBox from '../components/auth/FormBox'
import SubmitButton from '../components/auth/SubmitButton'
import BottomBox from '../components/auth/BottomBox'

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

const Login = () => {
  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <SubmitButton type="submit" value="Log in" />
        </form>
        <Separator text="or" />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        text="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  )
}

export default Login

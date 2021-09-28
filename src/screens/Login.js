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
import BottomBox from '../components/auth/BottomBox'
import Button from '../components/auth/Button'
import PageTitle from '../components/PageTitle'
import { useForm } from 'react-hook-form'

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

const Login = () => {
  const { register, handleSubmit } = useForm()
  const onValid = data => console.log(data)
  const onInValid = data => console.log(data, 'invalid')
  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid, onInValid)}>
          <Input
            {...register('username', {
              required: 'username이 필요합니다',
              minLength: 5,
              validate: val => val.includes('potato'),
            })}
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
          />
          <Input
            {...register('password', {
              required: 'password가 필요합니다.',
            })}
            type="password"
            placeholder="비밀번호"
          />
          <Button type="submit" value="로그인" />
        </form>
        <Separator text="또는" />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        text="계정이 없으신가요?"
        link={routes.signUp}
        linkText="가입하기"
      />
    </AuthLayout>
  )
}

export default Login

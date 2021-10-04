import React from 'react'
import styled from 'styled-components'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import routes from './routes'
import AuthLayout from '../components/auth/AuthLayout'
import Input from '../components/auth/Input'
import FormBox from '../components/auth/FormBox'
import BottomBox from '../components/auth/BottomBox'
import Button from '../components/auth/Button'
import PageTitle from '../components/PageTitle'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import FormError from '../components/auth/FormError'
import { useHistory } from 'react-router'
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SubTitle = styled.h2`
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: #979797;
  margin-top: 12px;
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`
const SignUp = () => {
  const history = useHistory()
  const onCompleted = data => {
    const {
      createAccount: { ok, error },
    } = data
    if (!ok) {
      return setError('result', {
        message: error,
      })
    }
    history.push(routes.home)
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  })
  const { register, handleSubmit, setError, formState } = useForm({
    mode: 'onChange',
  })
  // 유효하면 뮤테이션을 날려줘야 해
  const onValid = data => {
    if (loading) {
      return
    }
    createAccount({
      variables: { ...data },
    })
  }
  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderWrapper>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>친구들의 사진과 동영상을 보려면 가입하세요.</SubTitle>
        </HeaderWrapper>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register('firstName', { required: '이름이 필요합니다.' })}
            type="text"
            placeholder="이름"
            hasError={Boolean(formState.errors?.firstName?.message)}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input {...register('lastName')} type="text" placeholder="성" />
          <Input
            {...register('username', { required: '사용자 이름이 필요합니다.' })}
            type="text"
            placeholder="사용자 이름"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register('email', { required: '이메일이 필요합니다.' })}
            type="text"
            placeholder="이메일"
            hasError={Boolean(formState.errors?.email?.message)}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register('password', { required: '비밀번호가 필요합니다.' })}
            type="text"
            placeholder="비밀번호"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            disabled={!formState.isValid || loading}
            value="가입"
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        text="계정이 있으신가요?"
        link={routes.home}
        linkText="로그인"
      />
    </AuthLayout>
  )
}

export default SignUp

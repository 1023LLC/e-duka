import React from 'react'
import FormWrap from '../components/FormWrap'
import Container from '../components/Container'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'


const Login = async () => {

  const currentUser = await getCurrentUser()

  return (
    <Container>
        <FormWrap>
            <LoginForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  )
}

export default Login
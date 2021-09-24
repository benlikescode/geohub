import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Login } from '../components/Auth/Login'
import StyledAuthPage from '../styles/AuthPage.Styled'


const LoginPage: NextPage = () => {
  return (
    <StyledAuthPage>
      <Login />
    </StyledAuthPage>
  )
}

export default LoginPage

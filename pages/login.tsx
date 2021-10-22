import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Login } from '../components/Auth/Login'
import { Navbar } from '../components/Layout'
import StyledAuthPage from '../styles/AuthPage.Styled'


const LoginPage: NextPage = () => {
  return (
    <>
      <Navbar isAuthpage/>
      <StyledAuthPage>
        <Login />
      </StyledAuthPage> 
    </> 
  )
}

export default LoginPage

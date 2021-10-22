import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Register } from '../components/Auth/Register'
import { Navbar } from '../components/Layout'
import StyledAuthPage from '../styles/AuthPage.Styled'

const RegisterPage: NextPage = () => {
  return (
    <>
      <Navbar isAuthpage/>
      <StyledAuthPage>
        <Register />
      </StyledAuthPage> 
    </>  
  )
}

export default RegisterPage

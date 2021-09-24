import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Register } from '../components/Auth/Register'
import StyledAuthPage from '../styles/AuthPage.Styled'

const RegisterPage: NextPage = () => {
  return (
    <StyledAuthPage>
      <Register />
    </StyledAuthPage> 
  )
}

export default RegisterPage

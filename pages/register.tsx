import type { NextPage } from 'next'
import React from 'react'
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

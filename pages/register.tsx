import React from 'react'

import Register from '@components/Auth/Register'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'

const RegisterPage: PageType = () => {
  return (
    <StyledAuthPage>
      <Register />
    </StyledAuthPage>
  )
}

RegisterPage.noLayout = true

export default RegisterPage

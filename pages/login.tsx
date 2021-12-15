import type { NextPage } from 'next'
import Login from '../components/Auth/Login'
import StyledAuthPage from '../styles/AuthPage.Styled'

const LoginPage: NextPage = () => {
  return (
    <StyledAuthPage>
      <Login />
    </StyledAuthPage> 
  )
}

export default LoginPage

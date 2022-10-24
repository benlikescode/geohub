import Login from '@components/Auth/Login'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'

const LoginPage: PageType = () => {
  return (
    <StyledAuthPage>
      <Login />
    </StyledAuthPage>
  )
}

LoginPage.noLayout = true

export default LoginPage

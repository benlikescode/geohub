import { GetServerSidePropsContext } from 'next'
import { getSession, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppLogo } from '@components/AppLogo'
import { Button, Input } from '@components/system'
import { updateUser } from '@redux/slices'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'
import { showToast } from '@utils/helpers'

const LoginPage: PageType = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      dispatch(
        updateUser({
          id: session.user.id,
          name: session.user.name || '',
          email: session.user.email || '',
          avatar: session.user.avatar,
          bio: session.user.bio,
          isAdmin: session.user.isAdmin,
          distanceUnit: session.user.distanceUnit,
          mapsAPIKey: session.user.mapsAPIKey,
        })
      )

      router.replace('/')
    }
  }, [session])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      return showToast('error', 'Please enter your email address')
    }

    if (!password) {
      return showToast('error', 'Please enter your password')
    }

    setShowBtnSpinner(true)

    const res = await signIn('credentials', { redirect: false, ...{ email, password } })

    setShowBtnSpinner(false)

    if (!res || res.error) {
      return showToast('error', res?.error || '')
    }
  }

  return (
    <StyledAuthPage>
      <div className="logoWrapper">
        <AppLogo />
      </div>

      <section className="authContainer">
        <h1 className="title">Welcome Back!</h1>

        <form className="form-container" onSubmit={(e) => handleLogin(e)}>
          <div className="inputGroup">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              callback={setEmail}
              autoComplete="email"
              autoFocus
            />
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              callback={setPassword}
              autoComplete="current-password"
            />
          </div>

          <Link href="/forgot">
            <a className="forgot-message">Forgot password?</a>
          </Link>

          <Button className="submit-button" width="100%" isLoading={showBtnSpinner}>
            Login
          </Button>
        </form>

        <span className="authPrompt">
          Need an account?
          <Link href="/register">
            <a>Sign up</a>
          </Link>
        </span>
      </section>
    </StyledAuthPage>
  )
}

LoginPage.noLayout = true

export default LoginPage

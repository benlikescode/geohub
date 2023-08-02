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

// Redirect to home page if already logged in
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

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
      router.push('/')
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

    const userCredentials = { email, password }

    const res = await signIn('credentials', { redirect: false, ...userCredentials })

    if (!res || res.error) {
      setShowBtnSpinner(false)

      return showToast('error', res?.error || '')
    }

    setShowBtnSpinner(false)
  }

  return (
    <StyledAuthPage>
      <div className="logoWrapper">
        <AppLogo />
      </div>

      <section className="authContainer">
        <h1 className="title">Welcome Back!</h1>

        <form className="inputGroup" onSubmit={(e) => handleLogin(e)}>
          <Input
            id="email"
            type="text"
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

          <Button width="100%" isLoading={showBtnSpinner}>
            Login
          </Button>
        </form>

        <span className="authPrompt">
          Need an account?
          <Link href="/register">
            <a>Sign up.</a>
          </Link>
        </span>
      </section>
    </StyledAuthPage>
  )
}

LoginPage.noLayout = true

export default LoginPage

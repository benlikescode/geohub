import { GetServerSidePropsContext } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { mailman } from '@backend/utils/mailman'
import { AppLogo } from '@components/AppLogo'
import { Button, Input } from '@components/system'
import { updateUser } from '@redux/slices'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'
import { showErrorToast } from '@utils/helpers'

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

const RegisterPage: PageType = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const validateInputs = () => {
    const EMAIL_REGEX = /\S+@\S+\.\S+/

    if (!EMAIL_REGEX.test(email)) {
      showErrorToast('Invalid email address', { id: 'register-email' })
      return false
    }

    if (password.length < 6) {
      showErrorToast('Password must be atleast 6 characters', { id: 'register-pass' })
      return false
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowBtnSpinner(true)

    if (validateInputs()) {
      const user = { name, email, password }
      const res = await mailman('users/register', 'POST', JSON.stringify(user))

      if (res.error) {
        setShowBtnSpinner(false)

        return showErrorToast(res.error.message, { id: 'register-general' })
      }

      dispatch(
        updateUser({
          id: res._id,
          name: res.name,
          bio: res.bio,
          email: res.email,
          avatar: res.avatar,
          isAdmin: res.isAdmin,
          distanceUnit: res.distanceUnit,
          mapsAPIKey: res.mapsAPIKey,
        })
      )

      const userCredentials = { email, password }

      const signInResponse = await signIn('credentials', { redirect: false, ...userCredentials })

      if (!signInResponse || signInResponse.error) {
        setShowBtnSpinner(false)
        return showErrorToast(res?.error || '', { id: 'login-api' })
      }

      const prevRoute = router.query.callback as string
      router.push(prevRoute ?? '/')
    }

    setShowBtnSpinner(false)
  }

  return (
    <StyledAuthPage>
      <section className="authContainer">
        <div className="logoWrapper">
          <AppLogo />
        </div>

        <h1 className="title">Create your Account</h1>

        <form className="inputGroup" onSubmit={(e) => handleRegister(e)}>
          <Input
            id="name"
            type="text"
            label="Display Name"
            value={name}
            callback={setName}
            autoComplete="username"
            autoFocus
          />
          <Input id="email" type="text" label="Email Address" value={email} callback={setEmail} autoComplete="email" />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            callback={setPassword}
            autoComplete="new-password"
          />

          <Button width="100%" isLoading={showBtnSpinner}>
            Register
          </Button>
        </form>

        <span className="authPrompt">
          Already have an account?
          <Link href="/login">
            <a>Sign in.</a>
          </Link>
        </span>
      </section>
    </StyledAuthPage>
  )
}

RegisterPage.noLayout = true

export default RegisterPage

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { mailman } from '@backend/utils/mailman'
import { Button, Icon, Input, Spinner } from '@components/System'
import { ArrowRightIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { updateUser } from '@redux/slices'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'
import { showErrorToast } from '../utils/helpers/showToasts'

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

  // handles register by email
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
        })
      )

      const prevRoute = window.localStorage.getItem('path')
      router.push(prevRoute ?? '/')
    }

    setShowBtnSpinner(false)
  }

  return (
    <StyledAuthPage>
      <section className="authContainer">
        <Link href="/">
          <a>
            <div className="logoWrapper">
              <div className="logo">
                <Icon size={20} fill="#fff">
                  <LocationMarkerIcon />
                </Icon>
              </div>
              <h2 className="appTitle">GeoHub</h2>
            </div>
          </a>
        </Link>

        <h1 className="title">Create your Account</h1>

        {/* <div className="providers-group">
          <div className="provider-option">
            <svg viewBox="0 0 20 20">
              <g>
                <path
                  d="M19.9996 10.2297C19.9996 9.54995 19.9434 8.8665 19.8234 8.19775H10.2002V12.0486H15.711C15.4823 13.2905 14.7475 14.3892 13.6716 15.0873V17.586H16.9593C18.89 15.8443 19.9996 13.2722 19.9996 10.2297Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.2002 20.0003C12.9518 20.0003 15.2723 19.1147 16.963 17.5862L13.6753 15.0875C12.7606 15.6975 11.5797 16.0429 10.2039 16.0429C7.54224 16.0429 5.28544 14.2828 4.4757 11.9165H1.08301V14.4923C2.81497 17.8691 6.34261 20.0003 10.2002 20.0003Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.47227 11.9163C4.04491 10.6743 4.04491 9.32947 4.47227 8.0875V5.51172H1.08333C-0.363715 8.33737 -0.363715 11.6664 1.08333 14.4921L4.47227 11.9163Z"
                  fill="#FBBC04"
                ></path>
                <path
                  d="M10.2002 3.95756C11.6547 3.93552 13.0605 4.47198 14.1139 5.45674L17.0268 2.60169C15.1824 0.904099 12.7344 -0.0292099 10.2002 0.000185607C6.34261 0.000185607 2.81497 2.13136 1.08301 5.51185L4.47195 8.08764C5.27795 5.71762 7.53849 3.95756 10.2002 3.95756Z"
                  fill="#EA4335"
                ></path>
              </g>
            </svg>
            <span className="provider-name">Continue with Google</span>
          </div>

          <div className="provider-option">
            <svg viewBox="0 0 170 170">
              <path d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"></path>
            </svg>
            <span className="provider-name">Continue with Apple</span>
          </div>
        </div> */}

        <form className="inputGroup" onSubmit={(e) => handleRegister(e)}>
          <Input id="name" type="text" label="Display Name" callback={setName} autoComplete="username" autoFocus />
          <Input id="email" type="text" label="Email Address" callback={setEmail} autoComplete="email" />
          <Input id="password" type="password" label="Password" callback={setPassword} autoComplete="new-password" />

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

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Button, Icon, Input } from '@components/System'
import { Spinner } from '@components/System/Spinner'
import { LocationMarkerIcon } from '@heroicons/react/outline'
import { selectUser, updateUser } from '@redux/user'

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [generalErrorMsg, setGeneralErrorMsg] = useState('')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (user.id) {
      router.push('/')
    }
  }, [user])

  const validateEmail = () => {
    const basicRE = /\S+@\S+\.\S+/
    return basicRE.test(email)
  }

  const handleErrors = () => {
    let hasErrors = false
    setEmailErrorMsg('')
    setPasswordErrorMsg('')

    if (!validateEmail()) {
      hasErrors = true
      setEmailErrorMsg('Invalid email address')
    }

    if (!email) {
      hasErrors = true
      setEmailErrorMsg('This field is required')
    }

    return hasErrors
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowBtnSpinner(true)

    if (!handleErrors()) {
      try {
        const user = { email, password }
        const { status, res } = await mailman('users/login', 'POST', JSON.stringify(user))
        const resData = res.data

        if (res.success) {
          dispatch(
            updateUser({
              id: resData._id,
              name: resData.name,
              bio: resData.bio,
              email: resData.email,
              avatar: resData.avatar,
              isAdmin: resData.isAdmin,
            })
          )

          router.push('/')
        } else {
          setGeneralErrorMsg(res.errorMessage)
          setShowBtnSpinner(false)
        }
      } catch (err) {
        alert(err)
        setShowBtnSpinner(false)
      }
    } else {
      setGeneralErrorMsg('Incorrect email or password')
      setShowBtnSpinner(false)
    }
  }

  return (
    <section className="authContainer">
      <Link href="/">
        <a>
          <div className="logoWrapper">
            <div className="logo">
              <Icon size={28} fill="#fff">
                <LocationMarkerIcon />
              </Icon>
            </div>
            <h2 className="appTitle">GeoHub</h2>
          </div>
        </a>
      </Link>

      <h1 className="title">Welcome Back!</h1>

      {generalErrorMsg && (
        <div className="errorBanner">
          <svg aria-hidden="true" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="inputErrorText">{generalErrorMsg}</span>
        </div>
      )}

      <form className="inputGroup" onSubmit={(e) => handleLogin(e)}>
        <Input
          type="text"
          label="Email Address"
          callback={setEmail}
          errorMessage={emailErrorMsg}
          handleErrors={handleErrors}
          autoComplete="email"
        />
        <Input
          type="password"
          label="Password"
          callback={setPassword}
          errorMessage={passwordErrorMsg}
          handleErrors={handleErrors}
          autoComplete="current-password"
        />

        <Button type="solidPurple" width="100%">
          {showBtnSpinner ? <Spinner size={25} /> : 'Login'}
        </Button>
      </form>

      <span className="authPrompt">
        Not a member?
        <Link href="/register">
          <a> Sign Up</a>
        </Link>
      </span>
    </section>
  )
}

export default Login

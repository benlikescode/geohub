import { useRouter } from 'next/router'
import { FC, useMemo, useState } from 'react'
import { Button, Icon, Input } from '../System'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/user'
import Link from 'next/link'
import { mailman } from '../../backend/utils/mailman'
import { Spinner } from '../System/Spinner'
import { LocationMarkerIcon } from '@heroicons/react/outline'

const Register: FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameErrorMsg, setNameErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [generalErrorMsg, setGeneralErrorMsg] = useState('')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const isButtonDisabled = useMemo(() => !name || !email || !password, [name, email, password])

  const validateEmail = () => {
    const basicRE = /\S+@\S+\.\S+/
    return basicRE.test(email)
  }

  const handleErrors = () => {
    let hasErrors = false
    setNameErrorMsg('')
    setEmailErrorMsg('')
    setPasswordErrorMsg('')

    if (!validateEmail()) {
      hasErrors = true
      setEmailErrorMsg('Invalid email address')
    }

    if (password.length < 6) {
      hasErrors = true
      setPasswordErrorMsg('Password must be atleast 6 characters')
    }

    if (!name) {
      hasErrors = true
      setNameErrorMsg('This field is required')
    }

    if (!email) {
      hasErrors = true
      setEmailErrorMsg('This field is required')
    }

    if (!password) {
      hasErrors = true
      setPasswordErrorMsg('This field is required')
    }

    return hasErrors
  }

  // handles register by email
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowBtnSpinner(true)

    if (!handleErrors()) {
      try {
        const user = { name, email, password }
        const { status, res } = await mailman('users/register', 'POST', JSON.stringify(user))
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
              guessMapSize: 1,
            })
          )

          router.push('/')
        } else {
          setGeneralErrorMsg(res.errorMessage)
          setShowBtnSpinner(false)
        }
      } catch (err) {
        setGeneralErrorMsg(err as string)
        setShowBtnSpinner(false)
      }
    }
    setShowBtnSpinner(false)
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

      <h1 className="title">Create your Account</h1>

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

      <form className="inputGroup" onSubmit={(e) => handleRegister(e)}>
        <Input
          type="text"
          label="Display Name"
          callback={setName}
          errorMessage={nameErrorMsg}
          handleErrors={handleErrors}
          autoComplete="username"
        />
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
          autoComplete="new-password"
        />

        <Button type="solidPurple" isDisabled={isButtonDisabled} width="100%">
          {showBtnSpinner ? <Spinner size={25} /> : 'Register'}
        </Button>
      </form>

      <span className="authPrompt">
        Already a member?
        <Link href="/login">
          <a> Sign In</a>
        </Link>
      </span>
    </section>
  )
}

export default Register

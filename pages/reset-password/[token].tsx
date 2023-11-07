import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { AppLogo } from '@components/AppLogo'
import { Button, Input } from '@components/system'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'
import { mailman, showToast } from '@utils/helpers'

const ResetPasswordPage: PageType = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)

  const router = useRouter()
  const token = router.query.token as string

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      return showToast('error', 'Password must be atleast 6 characters')
    }

    if (password !== confirmPassword) {
      return showToast('error', 'Passwords do not match')
    }

    setShowBtnSpinner(true)

    const res = await mailman('auth/reset-password', 'POST', JSON.stringify({ password, confirmPassword, token }))

    if (res.error) {
      setShowBtnSpinner(false)
      return showToast('error', res.error.message)
    }

    showToast('success', res.message)

    router.push('/login')
  }

  return (
    <StyledAuthPage>
      <div className="logoWrapper">
        <AppLogo />
      </div>

      <section className="authContainer">
        <h1 className="title">Update your password</h1>

        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className="inputGroup">
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              callback={setPassword}
              autoComplete="password"
              autoFocus
            />
            <Input
              id="confirm-password"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              callback={setConfirmPassword}
              autoComplete="password"
            />
          </div>

          <Button className="submit-button" width="100%" isLoading={showBtnSpinner}>
            Submit
          </Button>
        </form>
      </section>
    </StyledAuthPage>
  )
}

ResetPasswordPage.noLayout = true

export default ResetPasswordPage

import { FormEvent, useState } from 'react'
import { AppLogo } from '@components/AppLogo'
import { Button, Input } from '@components/system'
import StyledAuthPage from '@styles/AuthPage.Styled'
import { PageType } from '@types'
import { mailman, showToast } from '@utils/helpers'

const ForgotPasswordPage: PageType = () => {
  const [email, setEmail] = useState('')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)
  const [sentEmail, setSentEmail] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email) {
      return showToast('error', 'You must include an email')
    }

    const EMAIL_REGEX = /\S+@\S+\.\S+/

    if (!EMAIL_REGEX.test(email)) {
      return showToast('error', 'Invalid email address')
    }

    setShowBtnSpinner(true)

    const res = await mailman('auth/forgot', 'POST', JSON.stringify({ email }))

    setShowBtnSpinner(false)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setSentEmail(true)
  }

  return (
    <StyledAuthPage>
      <div className="logoWrapper">
        <AppLogo />
      </div>

      <section className="authContainer">
        {sentEmail ? (
          <div className="email-sent-container">
            <h1 className="title">{`You've got mail`}</h1>

            <div className="email-sent-msg">
              {`If an account exists for ${email}, you will get an email with instructions to reset your password. If it doesn't arrive, be sure to check your spam folder or go`}
              <button onClick={() => setSentEmail(false)}>back.</button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="title">Reset your password</h1>

            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
              <div className="inputGroup">
                <Input
                  id="email"
                  type="text"
                  label="Email Address"
                  value={email}
                  callback={setEmail}
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <Button className="submit-button" width="100%" isLoading={showBtnSpinner}>
                Reset password
              </Button>
            </form>
          </>
        )}
      </section>
    </StyledAuthPage>
  )
}

ForgotPasswordPage.noLayout = true

export default ForgotPasswordPage

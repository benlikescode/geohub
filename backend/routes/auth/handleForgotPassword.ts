import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { resetPasswordEmail } from '@backend/emails'
import { collections, generateUrlSafeToken, sendEmail, throwError } from '@backend/utils'
import { forgotPasswordSchema } from '@backend/validations/userValidations'

const SUCCESS_RESPONSE = { message: 'Successfully sent reset email' }

const handleForgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = forgotPasswordSchema.parse(req.body)

  const user = await collections.users?.findOne({ email })

  // Skip email but show success to protect privacy
  if (!user) {
    return res.status(200).send(SUCCESS_RESPONSE)
  }

  const token = generateUrlSafeToken()
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  const tokenExpires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)

  const storeToken = await collections.passwordResets?.insertOne({
    userId: user._id,
    token: hashedToken,
    expires: tokenExpires,
  })

  if (!storeToken) {
    return throwError(res, 500, 'Failed to generate email token')
  }

  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const resetPasswordUrl = `${protocol}://${host}/reset-password/${token}`

  const subject = 'Password reset'
  const html = resetPasswordEmail(resetPasswordUrl)

  const emailResult = await sendEmail(email, subject, html)

  if (!emailResult) {
    return throwError(res, 500, 'Failed to send reset link')
  }

  res.status(200).send(SUCCESS_RESPONSE)
}

export default handleForgotPassword

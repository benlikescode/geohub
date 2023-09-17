import crypto from 'crypto'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, throwError } from '@backend/utils'
import sendEmail from '@backend/utils/sendEmail'

const generateUrlSafeToken = () => {
  const buffer = crypto.randomBytes(64)
  const token = buffer
    .toString('base64')
    .replace(/\+/g, '-') // Replace '+' with '-'
    .replace(/\//g, '_') // Replace '/' with '_'
    .replace(/=/g, '') // Remove trailing '=' characters
  return token
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    const SUCCESS_RESPONSE = { message: 'Successfully sent reset email' }

    if (req.method === 'POST') {
      const { email } = req.body

      if (!email) {
        return throwError(res, 400, 'You must include an email')
      }

      const EMAIL_REGEX = /\S+@\S+\.\S+/

      if (!EMAIL_REGEX.test(email)) {
        return throwError(res, 400, 'Invalid email address')
      }

      const user = await collections.users?.findOne({ email })

      // Skip email but show success to protect privacy
      if (!user) {
        return res.status(200).send(SUCCESS_RESPONSE)
      }

      const protocol = req.headers['x-forwarded-proto'] || 'http'
      const host = req.headers['x-forwarded-host'] || req.headers.host

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

      const resetPasswordUrl = `${protocol}://${host}/reset-password/${token}`
      const subject = 'Password reset'

      const emailText = {
        header: 'Forgot your password?',
        text: `No worries, it happens! Click the link below to reset your password. If you didn't make this request, please disregard this email and the link will expire in 24 hours.`,
        button: 'Reset your password',
        siteName: 'GeoHub',
        siteUrl: 'https://www.geohub.gg',
      }

      const html = `
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width: 670px;  margin: 0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height: 80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                            <a href=${emailText.siteUrl} style="color: #0e0e0e; font-size: 20px; text-decoration: none;">
                            ${emailText.siteName}
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height: 20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width: 670px; background: #fff; border-radius: 3px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0,0,0,.06); -moz-box-shadow: 0 6px 18px 0 rgba(0,0,0,.06); box-shadow: 0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height: 40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color: #1e1e2d; font-weight: 500; margin: 0; font-size: 24px; font-family:'Rubik', sans-serif;">${emailText.header}</h1>
                                          <span
                                              style="display: inline-block; vertical-align: middle; margin: 29px 0 26px; border-bottom: 1px solid #cecece; width: 100px;"></span>
                                          <p style="color: #455056; font-size: 15px; line-height: 24px; margin: 0;">${emailText.text}</p>
                                          <a href=${resetPasswordUrl} style="display: inline-block; background-color: #4338ca; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px; padding: 12px 18px; margin-top: 16px;">${emailText.button}</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height: 40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height: 80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
        </table>
      `

      const emailResult = await sendEmail(email, subject, html)

      if (!emailResult) {
        return throwError(res, 500, 'Failed to send reset link')
      }

      res.status(200).send(SUCCESS_RESPONSE)
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong, please try again later' })
  }
}

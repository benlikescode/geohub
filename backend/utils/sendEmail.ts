import SendGrid from '@sendgrid/mail'

SendGrid.setApiKey(process.env.SENDGRID_API_KEY as string)

const FROM_EMAIL = 'geohub.game@gmail.com'

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await SendGrid.send({ from: FROM_EMAIL, to, subject, html })
  } catch (err) {
    console.error(err)
    return false
  }

  return true
}

export default sendEmail

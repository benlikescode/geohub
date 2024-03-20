import SendGrid from '@sendgrid/mail'
import { SUPPORT_EMAIL } from '@utils/constants/random'

SendGrid.setApiKey(process.env.SENDGRID_API_KEY as string)

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await SendGrid.send({ from: SUPPORT_EMAIL, to, subject, html })
  } catch (err) {
    console.error(err)
    return false
  }

  return true
}

export default sendEmail

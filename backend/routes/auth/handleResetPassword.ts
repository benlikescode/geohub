import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'
import { resetPasswordSchema } from '@backend/validations/userValidations'

const handleResetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, token } = resetPasswordSchema.parse(req.body)

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const resetData = await collections.passwordResets?.findOne({ token: hashedToken, expires: { $gt: new Date() } })

  if (!resetData) {
    return throwError(res, 400, 'This token is invalid or has expired')
  }

  // Delete reset token as it has been used
  await collections.passwordResets?.deleteOne({ token: hashedToken })

  // Update user password
  const hashedPassword = bcrypt.hashSync(password, 10)

  // HALP -> would be nice to send a confirmation email to let user know
  // their password has been changed
  const updatedUser = await collections.users?.findOneAndUpdate(
    { _id: resetData.userId },
    { $set: { password: hashedPassword } }
  )

  if (!updatedUser) {
    return throwError(res, 500, 'Failed to update password')
  }

  res.status(200).send({ message: 'Successfully updated password' })
}

export default handleResetPassword

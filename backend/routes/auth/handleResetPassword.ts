import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'

const handleResetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, confirmPassword, token } = req.body

  if (!password || password.length < 6) {
    return throwError(res, 400, 'Password must be at least 6 characters')
  }

  if (password !== confirmPassword) {
    return throwError(res, 400, 'Passwords do not match')
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const resetData = await collections.passwordResets?.findOne({ token: hashedToken, expires: { $gt: new Date() } })

  if (!resetData) {
    return throwError(res, 400, 'This token is invalid or has expired')
  }

  // Delete reset token as it has been used
  await collections.passwordResets?.deleteOne({ token: hashedToken })

  // Update user password
  const hashedPassword = bcrypt.hashSync(password, 10)

  const updatedUser = await collections.users?.findOneAndUpdate(
    { _id: new ObjectId(resetData.userId) },
    { $set: { password: hashedPassword } }
  )

  if (!updatedUser) {
    return throwError(res, 500, 'Failed to update password')
  }

  res.status(200).send({ message: 'Successfully updated password' })
}

export default handleResetPassword

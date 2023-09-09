import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'
import { collections, throwError, verifyUser } from '@backend/utils'
import { updateUserSchema } from '@backend/validations/userValidations'
import { GUEST_ACCOUNT_ID } from '@utils/constants/random'

const updateUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { name, bio, avatar } = updateUserSchema.parse(req.body)

  if (userId === GUEST_ACCOUNT_ID) {
    return throwError(res, 401, 'This account is not allowed to modify profile values')
  }

  await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { name: name, bio: bio, avatar: avatar } })

  res.status(200).send({ status: 'ok' })
}

export default updateUserDetails

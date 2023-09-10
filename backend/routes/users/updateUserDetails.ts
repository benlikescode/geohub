import { NextApiRequest, NextApiResponse } from 'next'
import { GUEST_ACCOUNT_ID } from '@backend/constants/ids'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'
import { updateUserSchema } from '@backend/validations/userValidations'

const updateUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { name, bio, avatar } = updateUserSchema.parse(req.body)

  if (compareObjectIds(userId, GUEST_ACCOUNT_ID)) {
    return throwError(res, 401, 'This account is not allowed to modify profile values')
  }

  await collections.users?.updateOne({ _id: userId }, { $set: { name: name, bio: bio, avatar: avatar } })

  res.status(200).send({ status: 'ok' })
}

export default updateUserDetails

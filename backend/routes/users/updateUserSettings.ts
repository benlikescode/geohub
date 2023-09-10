import Cryptr from 'cryptr'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'
import { updateUserSettingsSchema } from '@backend/validations/userValidations'
import { GUEST_ACCOUNT_ID } from '@utils/constants/random'

const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string)

const updateUserSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, user } = await verifyUser(req, res)
  if (!userId || !user) return throwError(res, 401, 'Unauthorized')

  if (compareObjectIds(userId, GUEST_ACCOUNT_ID)) {
    return throwError(res, 401, 'This account is not allowed to modify settings')
  }

  const { distanceUnit, mapsAPIKey } = updateUserSettingsSchema.parse(req.body)

  const encrypedMapsAPIKey = mapsAPIKey ? cryptr.encrypt(mapsAPIKey) : ''

  const updateSettings = await collections.users?.updateOne(
    { _id: userId },
    { $set: { distanceUnit: distanceUnit, mapsAPIKey: encrypedMapsAPIKey } }
  )

  if (!updateSettings) {
    return throwError(res, 500, 'There was an unexpected problem while updating your settings')
  }

  res.status(200).send({ status: 'ok' })
}

export default updateUserSettings

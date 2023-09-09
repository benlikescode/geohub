import Cryptr from 'cryptr'
import { NextApiRequest, NextApiResponse } from 'next'
import { throwError, verifyUser } from '@backend/utils'

const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string)

const getUserSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, user } = await verifyUser(req, res)
  if (!userId || !user) return throwError(res, 401, 'Unauthorized')

  const decrypedMapsAPIKey = user.mapsAPIKey ? cryptr.decrypt(user.mapsAPIKey) : ''

  res.status(200).send({
    distanceUnit: user.distanceUnit,
    mapsAPIKey: decrypedMapsAPIKey,
  })
}

export default getUserSettings

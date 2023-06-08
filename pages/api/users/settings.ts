import Cryptr from 'cryptr'
/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect } from '@backend/utils/dbConnect'
import getUserId from '../../../backend/utils/getUserId'
import { throwError } from '../../../backend/utils/helpers'

const ALLOWED_DISTANCE_UNITS = ['metric', 'imperial']
const GOOGLE_MAPS_KEY_LENGTH = 39

const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const userId = await getUserId(req, res)

      const user = await collections.users?.findOne({ _id: new ObjectId(userId) })

      if (!user) {
        return throwError(res, 500, 'Failed to get user details.')
      }

      const decrypedMapsAPIKey = user.mapsAPIKey ? cryptr.decrypt(user.mapsAPIKey) : ''

      return res.status(200).send({
        distanceUnit: user.distanceUnit,
        mapsAPIKey: decrypedMapsAPIKey,
      })
    }

    if (req.method === 'POST') {
      const { distanceUnit, mapsAPIKey } = req.body
      const userId = await getUserId(req, res)

      if (!userId) {
        return throwError(res, 401, 'Not authorized to perform this action.')
      }

      if (!distanceUnit) {
        return throwError(res, 400, 'Missing distance unit.')
      }

      if (mapsAPIKey && (typeof mapsAPIKey !== 'string' || mapsAPIKey.length !== GOOGLE_MAPS_KEY_LENGTH)) {
        return throwError(res, 400, `The Google Maps API key should be ${GOOGLE_MAPS_KEY_LENGTH} characters in length.`)
      }

      if (typeof distanceUnit !== 'string' || !ALLOWED_DISTANCE_UNITS.includes(distanceUnit)) {
        return throwError(res, 400, 'This distance unit is not allowed.')
      }

      const encrypedMapsAPIKey = cryptr.encrypt(mapsAPIKey)

      const updateSettings = await collections.users?.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { distanceUnit: distanceUnit, mapsAPIKey: encrypedMapsAPIKey } }
      )

      if (!updateSettings) {
        return throwError(res, 500, 'There was an unexpected problem while updating your settings.')
      }

      res.status(200).send({ status: 'ok' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

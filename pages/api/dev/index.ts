/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { IS_PROD } from '@backend/utils/secrets'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'
import { randomElement } from '@utils/functions/generateLocations'
import { getRandomAvatar } from '@utils/helperFunctions'

// This endpoint is used soley for testing during development
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (process.env.NODE_ENV === 'production') {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    if (req.method === 'POST') {
      /*
      const result = await collections.maps?.deleteMany({ creator: { $ne: 'GeoHub' } })

      if (!result) {
        return res.status(400).send({ message: 'somethin wrong' })
      }

      res.status(200).send(result)
*/
      /*
      const randomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      }

      const result = await collections.games?.find({ createdAt: null }).forEach((game) => {
        const randDate = randomDate(new Date(2021, 10, 1), new Date(2022, 4, 1))
        console.log(randDate)
        collections.games?.updateOne({ _id: game._id }, { $set: { createdAt: randDate } })
      })

      if (!result) {
        return res.status(400).send({ message: 'Something went wrong updating all users' })
      }

      res.status(200).send({
        message: 'Successfully updated all users in the DB',
      })
      */
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

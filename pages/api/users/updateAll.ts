/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'
import { randomElement } from '@utils/functions/generateLocations'
import { getRandomAvatar } from '@utils/helperFunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    return res.status(405).end(`Method ${req.method} Not Allowed`)

    /* DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED

    // Updates all users in the DB (DONT enable on prod until proper auth introduced)
    // Currently updates all users avatar values to a random avatar

    // PRETTY SURE THIS WAS JUST FOR DEV PURPOSES -> SO THIS ENDPOINT CAN BE REMOVED
    if (req.method === 'POST') {
      const result = await collections.users?.find({}).forEach((user) => {
        const avatar = getRandomAvatar()

        collections.users?.updateOne({ _id: user._id }, { $set: { avatar: avatar } })
      })

      if (!result) {
        return res.status(400).send({ message: 'Something went wrong updating all users' })
      }

      res.status(200).send({
        message: 'Successfully updated all users in the DB',
      })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    
    */
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

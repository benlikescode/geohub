/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, getUserId, throwError } from '@backend/utils'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'
import { GUEST_ACCOUNT_ID } from '@utils/constants/random'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { _id, name, bio, avatar } = req.body
      const userId = await getUserId(req, res)

      if (!userId || userId !== _id.toString()) {
        return throwError(res, 401, 'Unauthorized')
      }

      if (userId === GUEST_ACCOUNT_ID) {
        return throwError(res, 401, 'This account is not allowed to modify profile values')
      }

      // Validate avatar
      if (!BACKGROUND_COLORS.includes(avatar.color) || !EMOJIS.includes(avatar.emoji)) {
        return throwError(res, 400, 'You picked an invalid avatar')
      }

      // Ensure new name is not already taken
      const findUserWithName = await collections.users?.findOne({ _id: { $ne: new ObjectId(userId) }, name: name })

      if (findUserWithName) {
        return throwError(res, 400, `The name ${name} is already taken`)
      }

      await collections.users?.updateOne({ _id: new ObjectId(_id) }, { $set: { name: name, bio: bio, avatar: avatar } })

      res.status(200).send({ status: 'ok' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

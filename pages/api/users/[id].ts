/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import { collections, dbConnect } from '@backend/utils/dbConnect'
import verifySession from '../../../backend/middlewares/verifySession'
import NextApiRequestWithSession from '../../../backend/types/NextApiRequestWithSession'

export default async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const hasSession = await verifySession(req, res)
    if (!hasSession) return

    await dbConnect()

    if (req.method === 'GET') {
      const userId = req.query.id as string

      const user = await collections.users
        ?.find({ _id: new ObjectId(userId) })
        .project({ password: 0, location: 0 })
        .toArray()

      if (!user || user.length !== 1) {
        return res.status(400).send(`Failed to find user with id: ${userId}`)
      }

      res.status(200).send(user[0])
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

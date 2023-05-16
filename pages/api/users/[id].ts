/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

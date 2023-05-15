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

    if (req.method === 'POST') {
      const { _id, name, bio, avatar } = req.body

      await collections.users?.updateOne({ _id: new ObjectId(_id) }, { $set: { name: name, bio: bio, avatar: avatar } })

      res.status(200).send({
        status: 'ok',
      })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

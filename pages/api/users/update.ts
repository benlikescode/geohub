/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      console.log(JSON.stringify(req.body))
      const { _id, name, bio, avatar } = req.body

      await collections.users?.updateOne({ _id: new ObjectId(_id) }, { $set: { name: name, bio: bio, avatar: avatar } })

      res.status(200).send({
        status: 'ok',
      })
    } else {
      /* Need to add extra security measures for this endpoint
    else if (req.method === 'DELETE') {
      const deletedUser = await collections.users?.deleteOne({ userId: userId })

      if (!deletedUser) {
        return res.status(400).send(`Failed to delete user with id: ${userId}`)
      }

      return res.status(200).send('Account successfully deleted')
    }
    */
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const userId = req.query.id as string

    if (req.method === 'GET') {
      const user = await collections.users
        ?.find({ _id: new ObjectId(userId || '62ae93fd8b39138695112026') })
        .project({ password: 0, location: 0 })
        .toArray()

      if (!user || user.length !== 1) {
        return res.status(400).send(`Failed to find user with id: ${userId}`)
      }

      res.status(200).send(user[0])
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

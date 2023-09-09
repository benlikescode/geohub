import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id as string

  const user = await collections.users
    ?.find({ _id: new ObjectId(userId) })
    .project(userProject)
    .toArray()

  if (!user || user.length !== 1) {
    return res.status(400).send(`Failed to find user with id: ${userId}`)
  }

  res.status(200).send(user[0])
}

export default getUserDetails

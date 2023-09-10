import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = objectIdSchema.parse(req.query.id)

  const user = await collections.users?.find({ _id: userId }).project(userProject).toArray()

  if (!user || user.length !== 1) {
    return res.status(400).send('Failed to get user details')
  }

  res.status(200).send(user[0])
}

export default getUserDetails

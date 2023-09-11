import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = objectIdSchema.parse(req.query.id)

  const user = await collections.users?.findOne({ _id: userId }, { projection: userProject })

  if (!user) {
    return throwError(res, 400, 'Failed to get user details')
  }

  res.status(200).send(user)
}

export default getUserDetails

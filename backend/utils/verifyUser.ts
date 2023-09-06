import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { collections, throwError } from '@backend/utils'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { UserType } from '@types'

const verifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return throwError(res, 401, 'Unauthorized')
  }

  const userId = session.user.id

  if (!userId) {
    return throwError(res, 401, 'Unauthorized')
  }

  const user = await collections.users?.findOne({ _id: new ObjectId(userId) })

  if (!user) {
    return throwError(res, 401, 'Unauthorized')
  }

  return user as UserType
}

export default verifyUser

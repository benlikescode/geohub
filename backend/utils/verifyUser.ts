import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { collections } from '@backend/utils'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { UserType } from '@types'

const ERROR_RESPONSE = { userId: undefined, roles: null, user: null }

const verifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return ERROR_RESPONSE
  }

  const userId = session.user.id

  if (!userId) {
    return ERROR_RESPONSE
  }

  const user = (await collections.users?.findOne({ _id: new ObjectId(userId) })) as UserType

  if (!user) {
    return ERROR_RESPONSE
  }

  return {
    userId: user._id,
    roles: {
      isAdmin: user.isAdmin,
    },
    user,
  }
}

export default verifyUser

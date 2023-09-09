import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { collections } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { UserType } from '@types'

const ERROR_RESPONSE = { userId: undefined, roles: null, user: null }

const verifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return ERROR_RESPONSE
  }

  const userId = objectIdSchema.parse(session.user.id)

  if (!userId) {
    return ERROR_RESPONSE
  }

  const user = (await collections.users?.findOne({ _id: userId })) as UserType

  if (!user) {
    return ERROR_RESPONSE
  }

  return {
    userId,
    roles: {
      isAdmin: user.isAdmin,
    },
    user,
  }
}

export default verifyUser

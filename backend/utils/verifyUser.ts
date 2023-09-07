import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { collections } from '@backend/utils'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { UserType } from '@types'

const verifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return null
  }

  const userId = session.user.id

  if (!userId) {
    return null
  }

  const user = (await collections.users?.findOne({ _id: new ObjectId(userId) })) as UserType

  if (!user) {
    return null
  }

  return user
}

export default verifyUser

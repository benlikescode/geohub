import { ObjectId } from 'mongodb'
import { collections } from '@backend/utils'

const isUserAnAdmin = async (userId?: string) => {
  if (!userId) {
    return false
  }

  const user = await collections.users?.findOne({ _id: new ObjectId(userId) })

  if (!user) {
    return false
  }

  return user.isAdmin
}

export default isUserAnAdmin

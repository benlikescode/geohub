import { collections } from '@backend/utils/dbConnect'
import { ObjectId } from 'mongodb'

const unbanUser = async (userId: string) => {
  const result = await collections.userBans?.updateOne(
    { userId: new ObjectId(userId) },
    { $set: { isBanned: false, 'bans.$[].isActive': false } }
  )

  return result
}

export default unbanUser

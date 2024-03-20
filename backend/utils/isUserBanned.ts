import { ObjectId } from 'mongodb'
import { collections } from '@backend/utils'
import unbanUser from '@backend/utils/unbanUser'

const isUserBanned = async (userId: string) => {
  const user = await collections.userBans?.findOne({ userId: new ObjectId(userId) })

  if (!user) {
    return { isBanned: false }
  }

  const { isBanned, bans } = user
  const activeBan = bans.find((ban) => ban.isActive)

  if (!isBanned || !activeBan) {
    return { isBanned: false }
  }

  const banHasEnded = activeBan.end && new Date() >= activeBan.end

  if (banHasEnded) {
    await unbanUser(userId)
    return { isBanned: false }
  }

  return { isBanned, details: activeBan }
}

export default isUserBanned

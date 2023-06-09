import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, isUserAnAdmin, throwError } from '@backend/utils'

const getAnalytics = async (req: NextApiRequest, res: NextApiResponse) => {
  const getCounts = async () => {
    const userCount = await collections.users?.estimatedDocumentCount()
    const singlePlayerGamesCount = await collections.games?.find({ challengeId: { $eq: null } }).count()
    const challengesCount = await collections.games?.find({ challengeId: { $ne: null } }).count()
    const streakGamesCount = await collections.games?.find({ mode: 'streak' }).count()

    return [
      { title: 'Users', count: userCount },
      { title: 'Single Player Games', count: singlePlayerGamesCount },
      { title: 'Challenges', count: challengesCount },
      { title: 'Streak Games', count: streakGamesCount },
    ]
  }

  const getRecentUsers = async () => {
    const recentUsers = await collections.users
      ?.find({})
      .sort({ createdAt: -1 })
      .project({ password: 0 })
      .limit(20)
      .toArray()

    return recentUsers
  }

  const getRecentGames = async () => {
    const recentGames = await collections.games
      ?.aggregate([
        // { $match: { createdAt: { $gt: weekAgo } } },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'maps',
            localField: 'mapId',
            foreignField: '_id',
            as: 'mapDetails',
          },
        },
      ])
      .limit(20)
      .toArray()

    return recentGames
  }

  const getRoundsSinceLaunch = async () => {
    const gamesSinceLaunch = await collections.games?.find({ createdAt: { $gte: new Date('2023-05-27') } }).toArray()

    let roundsCount = 0

    gamesSinceLaunch?.map((game) => (roundsCount += game.round - 1))

    return roundsCount
  }

  const userId = await getUserId(req, res)

  // Ensure this user is an admin
  const isAdmin = await isUserAnAdmin(userId)

  if (!isAdmin) {
    return throwError(res, 401, 'You are not authorized to view this page')
  }

  // Get analytics data
  const counts = await getCounts()
  const recentUsers = await getRecentUsers()
  const recentGames = await getRecentGames()
  const roundsSinceLaunch = await getRoundsSinceLaunch()

  res.status(200).json({
    success: true,
    data: {
      counts,
      recentUsers,
      recentGames,
      roundsSinceLaunch,
    },
  })
}

export default getAnalytics

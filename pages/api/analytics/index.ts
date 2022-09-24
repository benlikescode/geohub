import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { monthAgo, weekAgo } from '@backend/utils/queryDates'

const getCounts = async () => {
  const userCount = await collections.users?.estimatedDocumentCount()
  const spGamesCount = await collections.games?.estimatedDocumentCount()
  const challengesCount = await collections.challenges?.estimatedDocumentCount()
  const aerialCount = await collections.aerialGames?.estimatedDocumentCount()

  return [
    { title: 'Users', count: userCount },
    { title: 'Single Player Games', count: spGamesCount },
    { title: 'Challenges', count: challengesCount },
    { title: 'Aerial Games', count: aerialCount },
  ]
}

const getRecentUsers = async () => {
  const recentUsers = await collections.users
    ?.find({
      createdAt: { $gt: monthAgo },
    })
    .sort({ createdAt: -1 })
    .project({ password: 0 })
    .toArray()

  return recentUsers
}

const getRecentGames = async () => {
  const recentGames = await collections.games
    ?.aggregate([
      { $match: { createdAt: { $gt: weekAgo } } },
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
    .toArray()

  return recentGames
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      // Chore: Add server side admin check instead of client side

      const counts = await getCounts()
      const recentUsers = await getRecentUsers()
      const recentGames = await getRecentGames()

      res.status(200).json({
        success: true,
        data: {
          counts,
          recentUsers,
          recentGames,
        },
      })
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again later' })
  }
}

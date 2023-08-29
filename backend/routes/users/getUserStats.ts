import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'

const getUserStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId as string

  const queryFinishedGames = { userId: new ObjectId(userId), state: 'finished' }
  const queryFinishedStreakGames = { userId: new ObjectId(userId), state: 'finished', mode: 'streak' }

  const gamesPlayed = await collections.games?.find(queryFinishedGames).count()
  const bestGame = await collections.games?.findOne(queryFinishedGames, { sort: { totalPoints: -1 } })
  const averageGameScore = await collections.games
    ?.aggregate([
      { $match: queryFinishedGames },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
        },
      },
    ])
    .toArray()

  const streakGamesPlayed = await collections.games?.find(queryFinishedStreakGames).count()
  const bestStreakGame = await collections.games?.findOne(queryFinishedStreakGames, { sort: { totalPoints: -1 } })

  const dailyChallengeWins = await collections.challenges
    ?.find({ isDailyChallenge: true, winner: new ObjectId(userId) })
    .count()

  const result = {
    gamesPlayed: gamesPlayed || 0,
    bestGameScore: bestGame?.totalPoints || 0,
    averageGameScore: averageGameScore && averageGameScore.length > 0 ? Math.ceil(averageGameScore[0].avgScore) : 0,
    streakGamesPlayed: streakGamesPlayed || 0,
    bestStreakGame: bestStreakGame?.streak || 0,
    dailyChallengeWins: dailyChallengeWins || 0,
  }

  res.status(200).send(result)
}

export default getUserStats

import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '@backend/utils'

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

  const result = [
    { label: 'Completed Games', data: gamesPlayed || 0 },
    { label: 'Best Game', data: bestGame?.totalPoints || 0 },
    {
      label: 'Average Game Score',
      data: averageGameScore && averageGameScore.length > 0 ? Math.ceil(averageGameScore[0].avgScore) : 0,
    },
    { label: 'Completed Streak Games', data: streakGamesPlayed || 0 },
    { label: 'Best Streak Game', data: bestStreakGame?.streak || 0 },
    { label: 'Daily Challenge Wins', data: dailyChallengeWins || 0 },
  ]

  res.status(200).send(result)
}

export default getUserStats

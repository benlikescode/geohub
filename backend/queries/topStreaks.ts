import { TopScore } from '@backend/models'
import { collections } from '@backend/utils'

const queryTopStreaks = async (query: any, limit: number) => {
  const data = await collections.games
    ?.aggregate([
      // Match the documents
      { $match: { ...query, notForLeaderboard: { $ne: true } } },
      // Sort the matches in descending order
      { $sort: { streak: -1, totalTime: 1 } },
      // Group by unique userId, getting the first document
      // (We know that the first will be the highest, due to the sort)
      {
        $group: {
          _id: '$userId',
          gameId: { $first: '$_id' },
          totalTime: { $first: '$totalTime' },
          streak: { $first: '$streak' },
        },
      },
      // Re-sort the resulting documents
      { $sort: { streak: -1, totalTime: 1 } },
      { $limit: limit },
      // Format the result
      {
        $project: {
          _id: 0,
          gameId: '$gameId',
          userId: '$_id',
          totalPoints: '$streak',
          totalTime: 1,
        },
      },
    ])
    .toArray()

  return data as TopScore[] | undefined
}

export default queryTopStreaks

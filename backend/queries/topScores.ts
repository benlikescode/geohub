import { collections } from '@backend/utils'

const queryTopScores = async (query: any, limit: number) => {
  const data = await collections.games
    ?.aggregate([
      // Match the documents
      { $match: query },
      // Sort the matches in descending order
      { $sort: { totalPoints: -1, totalTime: 1 } },
      // Group by unique userId, getting the first document
      // (We know that the first will be the highest, due to the sort)
      {
        $group: {
          _id: '$userId',
          gameId: { $first: '$_id' },
          totalTime: { $first: '$totalTime' },
          totalPoints: { $first: '$totalPoints' },
        },
      },
      // Re-sort the resulting documents
      { $sort: { totalPoints: -1, totalTime: 1 } },
      { $limit: limit },
      // Query the user's details
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      // Unwind the user details from an array into an object
      {
        $unwind: '$userDetails',
      },
      // Format the result
      {
        $project: {
          _id: '$gameId',
          userId: '$_id',
          userName: '$userDetails.name',
          userAvatar: '$userDetails.avatar',
          totalPoints: 1,
          totalTime: 1,
        },
      },
    ])
    .toArray()

  return data
}

export default queryTopScores

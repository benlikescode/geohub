import { ObjectId } from 'mongodb'
import { collections, compareObjectIds } from '@backend/utils'

const getHighscores = async (userId: string | undefined, query: Object, limit: number | undefined) => {
  const numberOfScores = limit ? Math.min(limit, 50) : 5
  const scores = await queryTopScores(query, numberOfScores)

  if (!scores) {
    return null
  }

  // If not logged in, return early
  if (!userId) {
    return scores
  }

  // Check if we are one of the highscores
  const thisUserIndex = scores.findIndex((highscoreUser) => compareObjectIds(userId, highscoreUser?.userId))
  const isUserInTopScores = thisUserIndex !== -1

  if (isUserInTopScores) {
    scores[thisUserIndex] = { ...scores[thisUserIndex], highlight: true }
    return scores
  }

  // If not in highscores -> add our best score to the end
  const thisUserQuery = { userId: new ObjectId(userId), ...query }
  const thisUserData = await queryTopScores(thisUserQuery, 1)

  if (thisUserData && thisUserData.length === 1) {
    scores.push({ ...thisUserData[0], highlight: true })
  }

  return scores
}

const queryTopScores = async (query: any, limit: number) => {
  const data = await collections.games
    ?.aggregate([
      // Match the documents
      { $match: query },
      // Sort the matches in descending order
      { $sort: { totalPoints: -1, streak: -1, totalTime: 1 } },
      // Group by unique userId, getting the first document
      // (We know that the first will be the highest, due to the sort)
      {
        $group: {
          _id: '$userId',
          gameId: { $first: '$_id' },
          totalTime: { $first: '$totalTime' },
          totalPoints: { $first: '$totalPoints' },
          streak: { $first: '$streak' },
        },
      },
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
          streak: 1,
        },
      },
      // Re-sort the resulting documents
      { $sort: { totalPoints: -1, streak: -1, totalTime: 1 } },
    ])
    .limit(limit)
    .toArray()

  return data
}

export default getHighscores

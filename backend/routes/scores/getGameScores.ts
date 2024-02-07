import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import queryTopScores from '@backend/queries/topScores'
import { collections, getUserId, throwError } from '@backend/utils'

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60')

  const userId = await getUserId(req, res)
  const mapId = req.query.id as string

  // Get the top 5 user scores
  const query = { mapId: new ObjectId(mapId), state: 'finished' }
  const data = await queryTopScores(query, 5)

  if (!data) {
    return throwError(res, 404, 'Failed to get scores for this map')
  }

  // Determine if this user is in the top 5 (If yes -> mark them as highlight: true)
  const thisUserIndex = data.findIndex((user) => user?.userId?.toString() === userId)
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    data[thisUserIndex] = { ...data[thisUserIndex], highlight: true }
    return res.status(200).send(data)
  }

  // If this user is not in the top 5 -> Get their top score and mark them as highlight: true
  const thisUserQuery = await collections.games
    ?.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          mapId: new ObjectId(mapId),
          state: 'finished',
        },
      },
      {
        $sort: { totalPoints: -1 },
      },
      // Query the user's details
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
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
          _id: '$_id',
          userId: '$userDetails._id',
          userName: '$userDetails.name',
          userAvatar: '$userDetails.avatar',
          totalPoints: 1,
          totalTime: 1,
        },
      },
      {
        $limit: 1,
      },
    ])
    .toArray()

  console.log(thisUserQuery)

  // If this user has not played the map -> return early
  if (!thisUserQuery || thisUserQuery.length !== 1) {
    return res.status(200).send(data)
  }

  data.push({ ...thisUserQuery[0], highlight: true })

  res.status(200).send(data)
}

export default getGameScores

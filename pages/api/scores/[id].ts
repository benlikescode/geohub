import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.id as string

    if (req.method === 'GET') {
      const query = { mapId: mapId, round: 6 }
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
              totalPoints: 1,
              totalTime: 1,
              userId: '$_id',
              userName: '$userDetails.name',
              userAvatar: '$userDetails.avatar',
            },
          },
          // Re-sort the resulting documents
          { $sort: { totalPoints: -1, totalTime: 1 } },
        ])
        .limit(5)
        .toArray()

      if (!data) {
        return res.status(404).send(`Failed to get scores for map with id: ${mapId}`)
      }

      res.status(200).send(data)
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

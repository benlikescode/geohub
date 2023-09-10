import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getUserScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = objectIdSchema.parse(req.query.id)

  const page = req.query.page ? Number(req.query.page) : 0
  const gamesPerPage = 20

  const query = { userId, mode: 'standard', state: 'finished' }
  const games = await collections.games
    ?.aggregate([
      { $match: query },
      { $sort: { totalPoints: -1 } },
      { $skip: page * gamesPerPage },
      { $limit: gamesPerPage + 1 },
      {
        $project: {
          rounds: 0,
          guesses: 0,
        },
      },
      {
        $lookup: {
          from: 'maps',
          localField: 'mapId',
          foreignField: '_id',
          as: 'mapDetails',
        },
      },
      {
        $unwind: '$mapDetails',
      },
    ])
    .toArray()

  if (!games) {
    return res.status(404).send(`Failed to find games for user with id: ${userId}`)
  }

  const data = games.slice(0, gamesPerPage).map((item) => ({
    _id: item._id,
    mapId: item.mapId,
    mapName: item.mapDetails.name,
    mapAvatar: item.mapDetails.previewImg,
    totalPoints: item.totalPoints,
    totalTime: item.totalTime,
  }))

  // We set limit to gamesPerPage + 1 so we know if there is atleast 1 more game after this batch
  // Note that we still slice the response to only return gamesPerPage elements
  const hasMore = games.length > gamesPerPage

  res.status(200).send({
    data,
    hasMore,
  })
}

export default getUserScores

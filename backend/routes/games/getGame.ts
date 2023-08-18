import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '@backend/models'
import { collections, getUserId, throwError } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'
import { OFFICIAL_WORLD_ID } from '@utils/constants/random'

const getGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const gameId = req.query.id as string
  const userId = await getUserId(req, res)

  if (gameId.length !== 24) {
    return throwError(res, 404, 'Failed to find game')
  }

  const gameQuery = await collections.games
    ?.aggregate([
      { $match: { _id: new ObjectId(gameId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      { $project: { userDetails: userProject } },
    ])
    .toArray()

  if (!gameQuery || gameQuery.length !== 1) {
    return throwError(res, 404, 'Failed to find game')
  }

  const game = gameQuery[0] as Game

  const gameBelongsToUser = userId === game.userId.toString()

  const map = await collections.maps?.findOne({
    _id: new ObjectId(game.mapId.length === 24 ? game.mapId : OFFICIAL_WORLD_ID),
  })

  res.status(200).send({ game, mapDetails: map, gameBelongsToUser })
}

export default getGame

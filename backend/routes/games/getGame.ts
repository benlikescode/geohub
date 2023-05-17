import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../../models'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

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
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          userDetails: {
            password: 0,
          },
        },
      },
    ])
    .toArray()

  if (!gameQuery || gameQuery.length !== 1) {
    return throwError(res, 404, 'Failed to find game')
  }

  const game = gameQuery[0] as Game

  const gameBelongsToUser = userId === game.userId.toString()

  res.status(200).send({ game, gameBelongsToUser })
}

export default getGame

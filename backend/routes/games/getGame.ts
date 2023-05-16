import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../../models'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const getGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const gameId = req.query.id as string

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

  // // Dont expose country code to the FE -> Nvm, need for country streaks
  // COULD hide for regular games if i want, but really who gives af, cheaters gunna cheat
  // const roundsFiltered = game.rounds.map((round) => {
  //   return { ...round, countryCode: null, streakLocationCode: null }
  // })

  res.status(200).send(game)
}

export default getGame

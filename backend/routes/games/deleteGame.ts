import { NextApiRequest, NextApiResponse } from 'next'
import { GameModel } from '@backend/models'
import { collections, throwError, verifyUser } from '@backend/utils'
import compareObjectIds from '@backend/utils/compareObjectIds'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const deleteGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const gameId = objectIdSchema.parse(req.query.id)
  const game = (await collections.games?.findOne({ _id: gameId })) as GameModel

  if (!game) {
    return throwError(res, 401, 'The game you are trying to delete could not be found')
  }

  if (!compareObjectIds(userId, game.userId)) {
    return throwError(res, 401, 'You are not authorized to delete this game')
  }

  if (game.state === 'finished') {
    return throwError(res, 400, 'Can only delete unfinished games')
  }

  const deletedGame = await collections.games?.deleteOne({ _id: gameId })

  if (!deletedGame) {
    return throwError(res, 400, 'An error occured while deleting the game')
  }

  res.status(200).send({ message: 'The game was successfully deleted' })
}

export default deleteGame

import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'
import compareObjectIds from '@backend/utils/compareObjectIds'

const deleteGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const gameId = req.query.id as string
  const game = await collections.games?.findOne({ _id: new ObjectId(gameId) })

  if (!game) {
    return throwError(res, 401, 'The game you are trying to delete could not be found')
  }

  if (!compareObjectIds(userId, game.userId)) {
    return throwError(res, 401, 'You are not authorized to delete this game')
  }

  const deletedGame = await collections.games?.deleteOne({ _id: new ObjectId(gameId) })

  if (!deletedGame) {
    return throwError(res, 400, 'An error occured while deleting the game')
  }

  res.status(200).send({ message: 'The game was successfully deleted' })
}

export default deleteGame

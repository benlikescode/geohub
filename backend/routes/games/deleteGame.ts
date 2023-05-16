import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

const deleteGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const gameId = req.query.id as string

  const game = await collections.games?.findOne({ _id: new ObjectId(gameId) })

  if (!game) {
    return throwError(res, 401, 'The game you are trying to delete could not be found')
  }

  if (userId !== game.userId.toString()) {
    return throwError(res, 401, 'You are not authorized to delete this game')
  }

  // If authorized -> Remove game from DB
  const deletedGame = await collections.games?.deleteOne({ _id: new ObjectId(gameId) })

  if (!deletedGame) {
    return throwError(res, 400, 'An error occured while deleting the game')
  }

  res.status(200).send({ message: 'The game was successfully deleted' })
}

export default deleteGame

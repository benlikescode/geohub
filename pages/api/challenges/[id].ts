/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const challengeId = req.query.id as string
    const userId = req.query.userId as string

    if (req.method === 'GET') {
      const query = { _id: new ObjectId(challengeId) }
      const challenge = await collections.challenges?.findOne(query)

      if (!challenge) {
        return res.status(404).send(`Failed to find challenge with id: ${challengeId}`)
      }

      const challengeCreator = await collections.users?.findOne({ _id: challenge.creatorId })

      if (!challengeCreator) {
        return res
          .status(404)
          .send(`Failed to find data for the challenge creator with id: ${challenge.creatorId}`)
      }

      const playersGame = await collections.games?.findOne({
        userId: new ObjectId(userId),
        challengeId: new ObjectId(challengeId),
      })

      const result = {
        ...challenge,
        creatorName: challengeCreator.name,
        creatorAvatar: challengeCreator.avatar,
        playersGame,
      }

      res.status(200).send(result)
    } else if (req.method === 'POST') {
      const { mapId, gameSettings, userId, locations, challengeId } = req.body
      const userObjectId = new ObjectId(userId)
      const challengeObjectId = new ObjectId(challengeId)

      const newGame = {
        mapId,
        gameSettings,
        challengeId: challengeObjectId,
        userId: userObjectId,
        guesses: [],
        rounds: locations,
        round: 1,
        totalPoints: 0,
        totalDistance: 0,
        totalTime: 0,
      }

      // Create game that is associated with this challenge
      const result = await collections.games?.insertOne(newGame)

      if (!result) {
        return res.status(500).send(`Failed to create a new game for challenge: ${challengeId}`)
      }

      const id = result.insertedId

      res.status(201).send({ id, ...newGame })
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

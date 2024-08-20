import { catchErrors, collections, dbConnect, getUserId, throwError } from '@backend/utils'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const validation = z.object({
  feedback: z.string().max(5000),
  vote: z.number(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const userId = await getUserId(req, res)

      const voteStatus = await collections.feedback?.findOne({ userId: new ObjectId(userId) })

      return res.status(200).send({ hasVoted: !userId ? true : !!voteStatus })
    }

    if (req.method === 'POST') {
      const userId = await getUserId(req, res)

      if (!userId) {
        return throwError(res, 401, 'Not logged in')
      }

      const alreadyVoted = await collections.feedback?.findOne({ userId: new ObjectId(userId) })

      if (alreadyVoted) {
        return throwError(res, 400, 'Already voted')
      }

      const { feedback, vote } = validation.parse(req.body)

      const result = await collections.feedback?.insertOne({ feedback, vote, userId: new ObjectId(userId) })

      if (!result) {
        return throwError(res, 500, 'Failed to save feedback')
      }

      return res.status(200).send({ message: 'Successfully saved feedback' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    catchErrors(res, err)
  }
}

export default handler

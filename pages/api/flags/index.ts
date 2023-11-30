import { collections, dbConnect, throwError } from '@backend/utils'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const flags = await collections.featureFlags?.findOne({})

      if (!flags) {
        return throwError(res, 500, 'Failed to get feature flags')
      }

      res.status(200).send({ flags })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

export default handler

import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'

// NOT USING THIS
export const connectToAppDbMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  try {
    await dbConnect()
    return next()
  } catch (err) {
    return res.status(500).send(err)
  }
}

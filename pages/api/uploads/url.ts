import AWS from 'aws-sdk'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect, getUserId } from '@backend/utils'

const s3 = new AWS.S3()
const URL_EXPIRATION_SECONDS = 300

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const userId = await getUserId(req, res)

      if (!userId) {
        return res.status(401).send('Not authorized')
      }

      const randomID = Math.random() * 10000000
      const key = `${randomID}.json`

      const s3Params = {
        Bucket: `${process.env.AWS_BUCKET_NAME}/locations`,
        Key: key,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: 'application/json',
      }

      const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

      return res.status(200).send({ url: uploadURL, key })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import pako from 'pako'
import { calculateMapScoreFactor, collections, getUserId, throwError } from '@backend/utils'
import { LocationType } from '@types'
import { MAX_ALLOWED_CUSTOM_LOCATIONS } from '@utils/constants/random'
import { formatLargeNumber } from '@utils/helpers'

type ReqBody = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  locations?: LocationType[]
}

type UpdatedMap = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  lastUpdatedAt?: Date
}

const updateCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { name, description, previewImg, isPublished, locations } = req.body as ReqBody

  // try {
  //   const decompressed = ungzip(req.body, { to: 'string' })

  //   console.log(decompressed)
  //   console.log(JSON.parse(decompressed))
  // } catch (err) {
  //   return res.status(500).send(err)
  // }

  try {
    // Decompress the incoming data
    // const a = pako.ungzip(req.body, { to: 'string' })
    const restored = JSON.parse(pako.inflate(req.body, { to: 'string' }))

    console.log(restored)

    return res.status(200).send({ restored })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Error during decompression')
  }
}

export default updateCustomMap

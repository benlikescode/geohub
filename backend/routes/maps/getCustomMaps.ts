import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

// HALP -> likely want to paginate in future
const getCustomMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)

  const customMaps = await collections.maps
    ?.find({ creator: new ObjectId(userId), isDeleted: { $exists: false } })
    .sort({ createdAt: -1 })
    .toArray()

  if (!customMaps) {
    return throwError(res, 400, 'Could not retrieve your maps')
  }

  res.status(200).send(customMaps)
}

export default getCustomMaps

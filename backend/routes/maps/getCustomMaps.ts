import { ObjectId } from 'bson'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

// HALP -> likely want to paginate in future
const getCustomMaps = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id

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

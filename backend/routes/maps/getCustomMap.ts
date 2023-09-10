import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = objectIdSchema.parse(req.query.mapId)

  const mapDetails = await collections.maps?.findOne({ _id: mapId })

  if (!mapDetails) {
    return throwError(res, 400, `Failed to find map details`)
  }

  // Verify ownership of map
  if (!compareObjectIds(userId, mapDetails.creator)) {
    return throwError(res, 401, 'You are not authorized to view this page')
  }

  // Get corresponding locations
  const locations = await collections.userLocations?.find({ mapId }).project({ _id: 0, mapId: 0 }).toArray()

  if (!locations) {
    return throwError(res, 400, 'Failed to get locations for map')
  }

  res.status(200).send({ ...mapDetails, locations })
}

export default getCustomMap

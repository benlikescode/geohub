import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const deleteCustomMap = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id
  const mapId = req.query.mapId as string

  if (!mapId) {
    return throwError(res, 400, 'You must pass a valid mapId')
  }

  const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!mapDetails) {
    return throwError(res, 400, `Failed to find map details`)
  }

  if (userId !== mapDetails.creator?.toString()) {
    return throwError(res, 401, 'You do not have permission to delete this map')
  }

  // Remove map as a liked map for all users
  await collections.mapLikes?.deleteMany({ mapId: new ObjectId(mapId) })

  // Mark map as deleted in DB
  const markMapAsDeleted = await collections.maps?.updateOne(
    { _id: new ObjectId(mapId) },
    { $set: { isDeleted: true } }
  )

  if (!markMapAsDeleted) {
    return throwError(res, 400, 'An unexpected error occured while trying to delete')
  }

  // Choosing not to remove locations, atleast for now -> since ongoing games may still need locations
  // // Remove it's locations
  // const deleteLocations = await collections.userLocations?.deleteMany({ mapId: new ObjectId(mapId) })

  // if (!deleteLocations) {
  //   return throwError(res, 400, `There was a problem removing the locations from map with id: ${mapId}`)
  // }

  res.status(200).send({ message: 'Map was successfully deleted' })
}

export default deleteCustomMap

import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'

type Result = {
  type: 'term' | 'user' | 'map'
  term?: string
  _id?: ObjectId
  name?: string
  avatar?: { emoji: string; color: string }
  previewImg?: string
}

// Gets the 5 most recent searches from this user
const getRecentSearches = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const recentSearches = await collections.recentSearches?.findOne({ userId: new ObjectId(userId) })

  if (!recentSearches || !recentSearches.searches) {
    return throwError(res, 400, `Failed to find recent searches for user with id: ${userId}`)
  }

  const result: Result[] = []

  for (const search of recentSearches.searches) {
    const type = search.type

    if (type === 'term') {
      // Add term to result if unique
      if (!result.some((x) => x.term === search.term)) {
        result.push({ type, term: search.term })
      }
    }

    if (type === 'user') {
      // Add user to result if unique
      if (!result.some((x) => compareObjectIds(x._id, search.userId))) {
        const userDetails = await getUserDetailsHelper(search.userId as ObjectId)
        result.push({ type, ...userDetails })
      }
    }

    if (type === 'map') {
      // Add map to result if unique
      if (!result.some((x) => compareObjectIds(x._id, search.mapId))) {
        const mapDetails = await getMapDetailsHelper(search.mapId as ObjectId)
        result.push({ type, ...mapDetails })
      }
    }
  }

  res.status(200).send(result)
}

const getUserDetailsHelper = async (userId: ObjectId) => {
  const userDetails = await collections.users?.findOne({ _id: userId })

  if (!userDetails) return null

  const result = {
    _id: userDetails._id,
    name: userDetails.name,
    avatar: userDetails.avatar,
  }

  return result
}

const getMapDetailsHelper = async (mapId: ObjectId) => {
  const mapDetails = await collections.maps?.findOne({ _id: mapId })

  if (!mapDetails) return null

  const result = {
    _id: mapDetails._id,
    name: mapDetails.name,
    previewImg: mapDetails.previewImg,
  }

  return result
}

export default getRecentSearches

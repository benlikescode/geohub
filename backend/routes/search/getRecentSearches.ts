import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

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

// Gets the 5 most recent searches from this user
const getRecentSearches = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id

  const recentSearches = await collections.recentSearches?.findOne({ userId: new ObjectId(userId) })

  if (!recentSearches || !recentSearches.searches) {
    return throwError(res, 400, `Failed to find recent searches for user with id: ${userId}`)
  }

  const result = []

  for (const search of recentSearches.searches) {
    const type = search.type

    if (type === 'term') {
      result.push({ type, term: search.term })
    }

    if (type === 'user') {
      const userDetails = await getUserDetailsHelper(search.userId as ObjectId)
      result.push({ type, ...userDetails })
    }

    if (type === 'map') {
      const mapDetails = await getMapDetailsHelper(search.mapId as ObjectId)
      result.push({ type, ...mapDetails })
    }
  }

  res.status(200).send(result)
}

export default getRecentSearches

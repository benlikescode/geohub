import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'

const getMap = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60')

  const userId = await getUserId(req, res)
  const mapId = req.query.id as string
  const includeStats = req.query.stats as string // true or false

  if (!mapId) {
    return throwError(res, 400, 'You must pass a valid mapId')
  }

  // Get Map Details
  let mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!mapDetails) {
    return throwError(res, 404, `Failed to find map with id: ${mapId}`)
  }

  // If map is not published or is deleted -> return early
  if (!mapDetails.isPublished || (mapDetails.isDeleted && mapDetails.creator?.toString() !== userId)) {
    return throwError(res, 400, `This map has not been published or does not exist`)
  }

  const isOfficialMap = mapDetails.creator === 'GeoHub'

  // If map is user created -> get the user details
  if (!isOfficialMap) {
    const creatorDetails = await collections.users?.findOne(
      { _id: new ObjectId(mapDetails.creator) },
      { projection: userProject }
    )

    if (!creatorDetails) {
      return throwError(res, 404, `Failed to get creator details for map with id: ${mapId}`)
    }

    mapDetails = { ...mapDetails, creatorDetails }
  }

  // If query does not want stats, return early
  if (!includeStats || includeStats === 'false') {
    return res.status(200).send(mapDetails)
  }

  // Get Map's likes and if it's liked by this user
  const likes = await collections.mapLikes?.find({ mapId: new ObjectId(mapId) }).toArray()

  if (!likes) {
    return throwError(res, 404, `Failed to get likes for map with id: ${mapId}`)
  }

  const likedByUser = likes.some((like) => {
    return like.userId.toString() === userId?.toString()
  })

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mapId: new ObjectId(mapId), state: 'finished' } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return throwError(res, 500, 'Failed to get explorers and average score')
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }
  const roundedAvgScore = Math.ceil(avgScore)

  const locationCollection = mapDetails.creator === 'GeoHub' ? 'locations' : 'userLocations'
  const locationCount = await collections[locationCollection]?.find({ mapId: new ObjectId(mapId) }).count()

  const result = {
    ...mapDetails,
    likes: {
      numLikes: likes.length,
      likedByUser,
    },
    avgScore: roundedAvgScore,
    locationCount,
    usersPlayed: explorers,
  }

  res.status(200).send(result)
}

export default getMap

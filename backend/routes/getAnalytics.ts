import { NextApiRequest, NextApiResponse } from 'next'
import { collections, monthAgo, throwError, todayEnd, verifyUser } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'

const getAnalytics = async (req: NextApiRequest, res: NextApiResponse) => {
  const newUsersByDayStart = req.body.newUsersByDayStart
  const newUsersByDayEnd = req.body.newUsersByDayEnd

  const gamesPlayedByDayStart = req.body.gamesPlayedByDayStart
  const gamesPlayedByDayEnd = req.body.gamesPlayedByDayEnd

  const getCounts = async () => {
    const userCount = await collections.users?.estimatedDocumentCount()
    const singlePlayerGamesCount = await collections.games?.find({ challengeId: { $eq: null } }).count()
    const challengesCount = await collections.games?.find({ challengeId: { $ne: null } }).count()
    const streakGamesCount = await collections.games?.find({ mode: 'streak' }).count()
    const customMapsCount = await collections.maps?.find({ creator: { $ne: 'GeoHub' } }).count()
    const customLocationsCount = await collections.userLocations?.estimatedDocumentCount()
    const customKeysCount = await collections.users?.find({ mapsAPIKey: { $exists: true, $ne: '' } }).count()
    const unfinishedGamesCount = await collections.games?.find({ state: { $ne: 'finished' } }).count()

    return [
      { title: 'Users', count: userCount },
      { title: 'Single Player Games', count: singlePlayerGamesCount },
      { title: 'Challenges', count: challengesCount },
      { title: 'Streak Games', count: streakGamesCount },
      { title: 'Custom Maps', count: customMapsCount },
      { title: 'Custom Map Locations', count: customLocationsCount },
      { title: 'Custom Keys', count: customKeysCount },
      { title: 'Unfinished Games', count: unfinishedGamesCount },
    ]
  }

  const getRecentUsers = async () => {
    const users = await collections.users
      ?.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'games',
            localField: '_id',
            foreignField: 'userId',
            as: 'games',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            avatar: 1,
            createdAt: 1,
            gamesPlayed: { $size: '$games' },
          },
        },
      ])
      .limit(50)
      .toArray()

    return users
  }

  const getRecentGames = async () => {
    const recentGames = await collections.games
      ?.aggregate([
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: 'maps',
            localField: 'mapId',
            foreignField: '_id',
            as: 'mapDetails',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        { $unwind: '$userDetails' },
        { $project: { userDetails: userProject } },
      ])
      .limit(50)
      .toArray()

    return recentGames
  }

  const getNewUsersByDay = async () => {
    const newUsersByDay = await collections.users
      ?.aggregate([
        {
          $match: {
            createdAt: { $gte: newUsersByDayStart || monthAgo, $lte: newUsersByDayEnd || todayEnd },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $project: userProject },
        {
          $project: {
            _id: 0,
            date: '$_id',
            count: 1,
          },
        },
        {
          $sort: { date: -1 },
        },
      ])
      .toArray()

    return newUsersByDay
  }

  const getGamesPlayedByDay = async () => {
    const gamesPlayedByDay = await collections.games
      ?.aggregate([
        {
          $match: {
            createdAt: { $gte: gamesPlayedByDayStart || monthAgo, $lte: gamesPlayedByDayEnd || todayEnd },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            count: 1,
          },
        },
        {
          $sort: { date: -1 },
        },
      ])
      .toArray()

    return gamesPlayedByDay
  }

  const { userId, roles } = await verifyUser(req, res)

  if (!userId || !roles?.isAdmin) {
    return throwError(res, 401, 'Unauthorized')
  }

  const counts = await getCounts()
  const recentUsers = await getRecentUsers()
  const recentGames = await getRecentGames()
  const newUsersByDay = await getNewUsersByDay()
  const gamesPlayedByDay = await getGamesPlayedByDay()

  res.status(200).json({
    success: true,
    data: {
      counts,
      recentUsers,
      recentGames,
      newUsersByDay,
      gamesPlayedByDay,
    },
  })
}

export default getAnalytics

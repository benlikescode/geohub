import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, isUserAnAdmin, throwError } from '@backend/utils'
import { Game } from '../models'

const getAnalytics = async (req: NextApiRequest, res: NextApiResponse) => {
  const getCounts = async () => {
    const userCount = await collections.users?.estimatedDocumentCount()
    const singlePlayerGamesCount = await collections.games?.find({ challengeId: { $eq: null } }).count()
    const challengesCount = await collections.games?.find({ challengeId: { $ne: null } }).count()
    const streakGamesCount = await collections.games?.find({ mode: 'streak' }).count()
    const customMapsCount = await collections.maps?.find({ creator: { $ne: 'GeoHub' } }).count()
    const customKeysCount = await collections.users?.find({ mapsAPIKey: { $exists: true, $ne: '' } }).count()
    // const likedMapsCount = await collections.mapLikes?.find({}).count()
    // const searchesCount = await collections.recentSearches?.find({}).count()
    const unfinishedGamesCount = await collections.games?.find({ state: { $ne: 'finished' } }).count()
    const mapsCost = await getMapsCostSinceDay()

    return [
      { title: 'Users', count: userCount },
      { title: 'Single Player Games', count: singlePlayerGamesCount },
      { title: 'Challenges', count: challengesCount },
      { title: 'Streak Games', count: streakGamesCount },
      { title: 'Custom Maps', count: customMapsCount },
      { title: 'Custom Keys', count: customKeysCount },
      // { title: 'Liked Maps', count: likedMapsCount },
      // { title: 'Searches', count: searchesCount },
      { title: 'Unfinished Games', count: unfinishedGamesCount },
      { title: 'Google Maps Costs', count: mapsCost },
    ]
  }

  const getMapsCostSinceDay = async (day: string = '2023-06-01') => {
    const STREETVIEW_COST = 0.014
    const MAP_COST = 0.007
    const ROUND_COST = STREETVIEW_COST + 2 * MAP_COST // Streetview + Guess Map + Result Map

    const games = (await collections.games?.find({ createdAt: { $gte: new Date(day) } }).toArray()) as Game[]
    const numRounds = games.reduce((acc, currValue) => acc + currValue.round - 1, 0)

    const price = ROUND_COST * numRounds + MAP_COST * games.length

    return Math.round(price)
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
      .limit(200)
      .toArray()

    return users
  }

  const getRecentGames = async () => {
    const recentGames = await collections.games
      ?.aggregate([
        // { $match: { createdAt: { $gt: weekAgo } } },
        { $sort: { createdAt: -1 } },
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
      ])
      .limit(200)
      .toArray()

    return recentGames
  }

  const userId = await getUserId(req, res)

  // Ensure this user is an admin
  const isAdmin = await isUserAnAdmin(userId)

  if (!isAdmin) {
    return throwError(res, 401, 'You are not authorized to view this page')
  }

  // Get analytics data
  const counts = await getCounts()
  const recentUsers = await getRecentUsers()
  const recentGames = await getRecentGames()

  res.status(200).json({
    success: true,
    data: {
      counts,
      recentUsers,
      recentGames,
    },
  })
}

export default getAnalytics

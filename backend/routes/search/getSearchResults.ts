import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getQueryLimit } from '@backend/utils'

// Reference: https://docs.atlas.mongodb.com/reference/atlas-search/text/

const getSearchResults = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.q as string
  const limit = getQueryLimit(req.query.count, 3)

  const userResults = await collections.users
    ?.aggregate([
      {
        $search: {
          index: 'user-search',
          autocomplete: {
            query: query,
            path: 'name',
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          avatar: 1,
          score: { $meta: 'searchScore' },
        },
      },
      { $limit: limit },
    ])
    .toArray()

  const mapResults = await collections.maps
    ?.aggregate([
      {
        $search: {
          index: 'search-maps',
          autocomplete: {
            query: query,
            path: 'name',
          },
        },
      },
      { $match: { isPublished: true, isDeleted: { $exists: false } } },
      {
        $project: {
          _id: 1,
          name: 1,
          previewImg: 1,
          score: { $meta: 'searchScore' },
        },
      },
      { $limit: limit },
    ])
    .toArray()

  const users = userResults || []
  const maps = mapResults || []

  const all = [...users, ...maps]
  all.sort((a, b) => b?.score - a?.score)

  res.status(200).send({ all, users, maps })
}

export default getSearchResults

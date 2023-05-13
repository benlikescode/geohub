import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // reference:
  // https://docs.atlas.mongodb.com/reference/atlas-search/text/

  try {
    await dbConnect()

    // Takes in a search query and returns at most 3 users and 3 maps matching the query
    if (req.method === 'GET') {
      const query = req.query.q as string
      const count = Number(req.query.count as string)

      const usersQuery = await collections.users
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
              password: 0,
              location: 0,
            },
          },
          {
            $limit: count || 3,
          },
        ])
        .toArray()

      const mapsQuery = await collections.maps
        ?.aggregate([
          {
            $search: {
              index: 'search-maps',
              autocomplete: {
                query: query,
                path: 'name',
              },

              // compound: {
              //   must: [
              //     {
              //       equals: {
              //         value: true,
              //         path: 'isPublished',
              //       },
              //     },
              //   ],
              // },
            },
          },
          { $match: { isPublished: true, isDeleted: { $exists: false } } },
          {
            $limit: count || 3,
          },
        ])
        .toArray()

      const users = usersQuery || []
      const maps = mapsQuery || []

      res.status(200).send({ users, maps })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

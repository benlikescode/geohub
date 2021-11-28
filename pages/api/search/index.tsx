import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // reference:
  // https://docs.atlas.mongodb.com/reference/atlas-search/text/

  try {
    await dbConnect()
    const query = req.query.q as string
    const count = Number(req.query.count as string)

    if (req.method === 'GET') {
      const users = await collections.users?.aggregate([
        {
          $search: {
            index: 'user-search',
            autocomplete: {
              query: query,
              path: 'name',
            }
          },
        },
        {
          $project: {
            'avatar': 1,
            'name': 1
          }
        },
        {
          $limit: count || 3
        }
      ]).toArray()
      
      const maps = await collections.maps?.aggregate([
        {
          $search: {
            index: 'search-maps',
            autocomplete: {
              query: query,
              path: 'name',
            }
          },
        },
        {
          $project: {
            'previewImg': 1,
            'name': 1,
            'slug': 1
          }
        },
        {
          $limit: count || 3
        }
      ]).toArray()

      if (users && maps) {
        const result = users?.concat(maps)
        res.status(200).send(result)
      } 
    }

    else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
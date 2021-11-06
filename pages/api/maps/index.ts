import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { getLocationsFromMapId } from '../../../utils/functions/generateLocations'
import { ObjectId } from 'mongodb'
import { Map } from '../../../backend/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Creates a map
    if (req.method === 'POST') {
      // body will contain: 
      // name, description, creator, isPublished (can also contain customLocations)
      // note that data in body can override the defaults specified above it
      
      const newMap = {
        previewImg: 'https://wallpaperaccess.com/full/2707446.jpg',
        createdAt: new Date().toString(),
        usersPlayed: 0,
        locationCount: 0,
        avgScore: 0,
        likes: 0,
        isPublished: true,
        slug: null,
        ...req.body, 
      } as Map

      const result = await collections.maps?.insertOne(newMap)
      
      if (!result) {
        return res.status(500).send('Failed to create new map')
      }

      res.status(201).send(result.insertedId)
    }
    else {
      res.status(500).json({ message: 'Invalid request' })
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
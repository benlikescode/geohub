import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { randomInt } from '../../../utils/functions/generateLocations'
import bcrypt from 'bcryptjs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { name, email, password } = req.body
      
      // first check if we already have a user with this email
      let findUser = await collections.users?.findOne({ email: email })

      if (findUser) {
        return res.status(400).json({
          errorField: 'email',
          errorMessage: 'An account with that email already exists'
        })   
      }

      // next check if we have a user with this name
      findUser = await collections.users?.findOne({ name: name })

      if (findUser) {
        return res.status(400).json({
          errorField: 'name',
          errorMessage: `The name ${name} is already taken`
        })     
      }

      // if we make it here, values are unique and we create the user
      const hashPassword = bcrypt.hashSync(password, 10)

      const newUser = {
        name,
        email, 
        password: hashPassword,
        avatar: `default${randomInt(1, 6)}`,
        createdAt: new Date().toString(),
        location: 'Canada'
      }

      await collections.users?.insertOne(newUser)
          
      res.status(201).json({
        success: true, 
        data: {
          ...newUser,
          password: ''
        }
      })
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
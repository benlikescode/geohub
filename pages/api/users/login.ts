import { collections, dbConnect } from '@backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { email, password } = req.body

      const user = await collections.users?.findOne({ email: email })

      if (!user) {
        return res.status(400).json({
          errorMessage: 'Incorrect email or password',
        })
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        return res.status(400).json({
          errorMessage: 'Incorrect email or password',
        })
      }

      res.status(200).json({
        success: true,
        data: {
          ...user,
          password: '',
        },
      })
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again later' })
  }
}

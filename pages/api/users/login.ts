/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, throwError } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { email, password } = req.body

      const user = await collections.users?.findOne({ email: email })

      if (!user) {
        return throwError(res, 400, 'Incorrect email or password')
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        return throwError(res, 400, 'Incorrect email or password')
      }

      res.status(200).json({
        ...user,
        password: '',
      })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong, please try again later' })
  }
}

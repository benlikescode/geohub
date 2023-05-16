import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import NextApiRequestWithSession from '../types/NextApiRequestWithSession'
import { throwError } from '../utils/helpers'

// TO DELETE
const verifySession = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getSession({ req })

  // if (!session) {
  //   throwError(res, 401, 'You must be logged in')
  //   return false
  // }

  // req.userId = session.user.id

  return true
}

export default verifySession

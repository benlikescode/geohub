import { NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import NextApiRequestWithSession from '../types/NextApiRequestWithSession'
import { throwError } from '../utils/helpers'

const verifySession = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    throwError(res, 401, 'You must be logged in')
    return false
  }

  req.user = session.user

  return true
}

export default verifySession

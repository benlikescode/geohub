import { NextApiRequest } from 'next'
import { Session } from 'next-auth'

interface NextApiRequestWithSession extends NextApiRequest {
  user: Session['user']
}

export default NextApiRequestWithSession

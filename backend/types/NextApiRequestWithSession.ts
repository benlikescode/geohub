import { NextApiRequest } from 'next'
import { Session } from 'next-auth'

// TO DELETE
interface NextApiRequestWithSession extends NextApiRequest {
  userId: Session['user']['id'] | undefined
}

export default NextApiRequestWithSession

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const getUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) return undefined

  return session.user.id
}

export default getUserId

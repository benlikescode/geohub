import { NextApiResponse } from 'next'

// Standard return for any error in API
const throwError = (res: NextApiResponse, status: number, clientMessage: string, debugInfo?: string) => {
  return res.status(status).send({
    error: {
      message: clientMessage,
      code: status,
      debug: debugInfo,
    },
  })
}

export default throwError

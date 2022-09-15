import { NextApiResponse } from 'next'

export const throwError = (res: NextApiResponse, status: number, message: string) => {
  return res.status(status).send({
    error: {
      message,
      code: status,
    },
  })
}

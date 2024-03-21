import { NextApiResponse } from 'next'
import { ZodError } from 'zod'
import { throwError } from '@backend/utils'

const catchErrors = (res: NextApiResponse, err: unknown) => {
  console.error(err)

  if (err instanceof ZodError) {
    return throwError(res, 400, (err as ZodError).issues[0].message)
  }

  return throwError(res, 500, 'An unexpected error occured')
}

export default catchErrors

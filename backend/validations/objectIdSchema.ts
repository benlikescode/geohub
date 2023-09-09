import { ObjectId } from 'mongodb'
import { z } from 'zod'

const OBJECT_ID_LEN = 24

export const objectIdSchema = z
  .string({ required_error: 'Missing some ObjectId' })
  .length(OBJECT_ID_LEN, `ObjectId must be ${OBJECT_ID_LEN} characters in length`)
  .transform((id) => new ObjectId(id))
  .or(z.instanceof(ObjectId))

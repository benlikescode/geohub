import { z } from 'zod'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const SEARCH_TYPES = ['term', 'user', 'map'] as const

export const saveSearchSchema = z
  .object({
    type: z.enum(SEARCH_TYPES, { required_error: 'Search type is required' }),
    term: z.string().optional(),
    searchedUserId: objectIdSchema.optional(),
    searchedMapId: objectIdSchema.optional(),
  })
  .refine(({ type, term, searchedUserId, searchedMapId }) => {
    if (type === 'term') {
      return term !== undefined
    }

    if (type === 'user') {
      return searchedUserId !== undefined
    }

    if (type === 'map') {
      return searchedMapId !== undefined
    }
  }, 'Searched value does not match type')

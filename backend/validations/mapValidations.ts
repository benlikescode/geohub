import { z } from 'zod'
import { locationsSchema } from '@backend/validations/locationsSchema'
import { CUSTOM_MAP_AVATARS, MAX_ALLOWED_CUSTOM_LOCATIONS } from '@utils/constants/random'
import { formatLargeNumber } from '@utils/helpers'

const NAME_MAX_LEN = 30
const DESCRIPTION_MAX_LEN = 60

const nameSchema = z
  .string({ required_error: 'Name is required' })
  .nonempty('Name can not be empty')
  .max(NAME_MAX_LEN, `Name must be at most ${NAME_MAX_LEN} characters`)

const descriptionSchema = z
  .string()
  .max(DESCRIPTION_MAX_LEN, `Description must be at most ${DESCRIPTION_MAX_LEN} characters`)

const previewImgSchema = z.string({ required_error: 'Avatar is required' }).refine((value) => {
  return CUSTOM_MAP_AVATARS.includes(value)
}, 'Invalid avatar')

const isPublishedSchema = z.boolean()

const customLocationsSchema = locationsSchema
  .min(5, `Maps must have at least 5 locations`)
  .max(
    MAX_ALLOWED_CUSTOM_LOCATIONS,
    `Maps must have at most ${formatLargeNumber(MAX_ALLOWED_CUSTOM_LOCATIONS)} locations`
  )

export const createCustomMapSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
  avatar: previewImgSchema,
})

export const updateCustomMapSchema = z
  .object({
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
    previewImg: previewImgSchema.optional(),
    isPublished: isPublishedSchema.optional(),
    locations: customLocationsSchema.optional(),
  })
  .refine(({ name, description, previewImg, isPublished, locations }) => {
    return (
      name !== undefined ||
      description !== undefined ||
      previewImg !== undefined ||
      isPublished !== undefined ||
      locations !== undefined
    )
  }, 'No fields provided to update')

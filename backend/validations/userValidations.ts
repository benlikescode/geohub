import { z } from 'zod'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'

export const NAME_MAX_LEN = 30
export const EMAIL_MAX_LEN = 320
export const PASSWORD_MIN_LEN = 6
export const PASSWORD_MAX_LEN = 72
export const BIO_MAX_LEN = 200
export const ALLOWED_DISTANCE_UNITS = ['metric', 'imperial'] as const
export const GOOGLE_MAPS_KEY_LEN = 39

const nameSchema = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .nonempty('Name is required')
  .max(NAME_MAX_LEN, `Name must be at most ${NAME_MAX_LEN} characters`)

const emailSchema = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .email('Invalid email address')
  .max(EMAIL_MAX_LEN, `Email must be at most ${EMAIL_MAX_LEN} characters`)

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(PASSWORD_MIN_LEN, `Password must be at least ${PASSWORD_MIN_LEN} characters`)
  .max(PASSWORD_MAX_LEN, `Password must be at most ${PASSWORD_MAX_LEN} characters`)

const confirmPasswordSchema = z
  .string({
    required_error: 'Confirm Password is required',
    invalid_type_error: 'Confirm Password must be a string',
  })
  .min(PASSWORD_MIN_LEN, `Confirm Password must be at least ${PASSWORD_MIN_LEN} characters`)
  .max(PASSWORD_MAX_LEN, `Confirm Password must be at most ${PASSWORD_MAX_LEN} characters`)

const resetTokenSchema = z
  .string({
    required_error: 'Token is required',
    invalid_type_error: 'Token must be a string',
  })
  .nonempty('Token can not be empty')

const bioSchema = z
  .string({ required_error: 'Missing bio' })
  .max(BIO_MAX_LEN, `Bio must be at most ${BIO_MAX_LEN} characters`)

const avatarSchema = z
  .object(
    {
      color: z.string({ required_error: 'Avatar must have a color value' }),
      emoji: z.string({ required_error: 'Avatar must have an emoji value' }),
    },
    { required_error: 'Avatar is required' }
  )
  .refine(({ color, emoji }) => {
    return BACKGROUND_COLORS.includes(color) && EMOJIS.includes(emoji)
  }, 'Invalid avatar')

export const registerUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    token: resetTokenSchema,
  })
  .refine(({ password, confirmPassword }) => {
    return password === confirmPassword
  }, 'Passwords do not match')

export const updateUserSchema = z.object({
  name: nameSchema,
  bio: bioSchema.optional(),
  avatar: avatarSchema,
})

export const updateUserSettingsSchema = z.object({
  distanceUnit: z.enum(ALLOWED_DISTANCE_UNITS, {
    required_error: 'Missing distance unit',
    invalid_type_error: 'Invalid distance unit',
  }),
  mapsAPIKey: z
    .string()
    .length(GOOGLE_MAPS_KEY_LEN, `Google Maps API keys should be ${GOOGLE_MAPS_KEY_LEN} characters`)
    .or(z.string().length(0))
    .optional(),
})

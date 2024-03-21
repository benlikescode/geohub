import { stringWithMinMax } from '@backend/validations/validationUtils'
import { z } from 'zod'

export const NAME_MIN_LEN = 1
export const NAME_MAX_LEN = 30
export const EMAIL_MIN_LEN = 1
export const EMAIL_MAX_LEN = 320
export const PASSWORD_MIN_LEN = 6
export const PASSWORD_MAX_LEN = 72

export const nameSchema = stringWithMinMax('Name', NAME_MIN_LEN, NAME_MAX_LEN)
export const emailSchema = stringWithMinMax('Email', EMAIL_MIN_LEN, EMAIL_MAX_LEN).email('Invalid email address')
export const passwordSchema = stringWithMinMax('Password', PASSWORD_MIN_LEN, PASSWORD_MAX_LEN)

export const registerUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

import { z } from 'zod'

export const stringWithMinMax = (field: string, min: number, max: number) => {
  const minMsg = min > 1 ? `${field} must be at least ${min} characters` : `${field} can not be empty`
  const maxMsg = `Name must be at most ${max} characters`

  return z
    .string({
      required_error: `${field} is required`,
      invalid_type_error: `${field} must be a string`,
    })
    .min(min, minMsg)
    .max(max, maxMsg)
}

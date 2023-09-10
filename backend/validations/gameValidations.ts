import { z } from 'zod'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const MODE_OPTIONS = ['standard', 'streak'] as const

const gameSettingsSchema = z.object(
  {
    timeLimit: z
      .number({ required_error: 'Settings is missing timeLimit' })
      .min(0, 'Time limit must be at least 0')
      .max(600, 'Time limit must be at most 600'),
    canMove: z.boolean({ required_error: 'Settings is missing canMove' }),
    canPan: z.boolean({ required_error: 'Settings is missing canPan' }),
    canZoom: z.boolean({ required_error: 'Settings is missing canZoom' }),
  },
  { required_error: 'Game settings are required' }
)

export const createGameSchema = z.object({
  mapId: objectIdSchema,
  mode: z.enum(MODE_OPTIONS, { required_error: 'Mode is required' }),
  gameSettings: gameSettingsSchema,
})

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

const guessSchema = z.object(
  {
    lat: z
      .number({ required_error: 'Guess is missing lat' })
      .min(-90, 'lat must be at least -90')
      .max(90, 'lat must be at most 90'),
    lng: z
      .number({ required_error: 'Guess is missing lng' })
      .min(-180, 'lng must be at least -180')
      .max(180, 'lng must be at most 180'),
  },
  { required_error: 'Guess is required' }
)

export const updateGameSchema = z.object({
  guess: guessSchema,
  guessTime: z.number({
    required_error: 'Guess time is required',
    invalid_type_error: 'Guess time should be in seconds',
  }),
  localRound: z.number({
    required_error: 'Local round is required',
    invalid_type_error: 'Local round should be a number',
  }),
  timedOut: z.boolean().optional(),
  timedOutWithGuess: z.boolean({ required_error: 'timedOutWithGuess is required' }),
  streakLocationCode: z.string(),
})

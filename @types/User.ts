import { GameSettingsType } from '.'

type User = {
  id: string
  _id?: string // replace id with _id throughout app
  name: string
  bio?: string
  email: string
  avatar: { emoji: string; color: string }
  createdAt?: Date
  isAdmin?: boolean
  guessMapSize?: number
  gameSettings?: GameSettingsType
  distanceUnit?: 'metric' | 'imperial'
  mapsAPIKey?: string
}

export default User

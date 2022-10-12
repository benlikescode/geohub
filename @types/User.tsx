import { GameSettingsType } from './'

type User = {
  id: string
  _id?: string // replace id with _id throughout app
  name: string
  bio?: string
  email: string
  avatar: { emoji: string; color: string }
  createdAt?: Date
  location?: string
  isAdmin?: boolean
  guessMapSize?: number
  gameSettings?: GameSettingsType
}

export default User

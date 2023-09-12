import { ObjectId } from 'mongodb'

type User = {
  _id: ObjectId
  name: string
  bio?: string
  email: string
  password: string
  avatar: { emoji: string; color: string }
  createdAt?: Date
  isAdmin?: boolean
  distanceUnit?: 'metric' | 'imperial'
  mapsAPIKey?: string
}

export default User

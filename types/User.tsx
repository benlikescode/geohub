type User = {
  id: string
  _id?: string // replace id with _id throughout app
  name: string
  bio?: string
  email: string
  avatar: string
  createdAt?: Date
  location?: string
  isAdmin?: boolean
  guessMapSize?: number
}

export default User

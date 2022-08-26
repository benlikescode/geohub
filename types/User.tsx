type User = {
  id: string
  name: string
  bio?: string
  email: string
  avatar: string
  createdAt?: Date
  location?: string
  isAdmin?: boolean
}

export default User
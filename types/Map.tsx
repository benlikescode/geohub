import { LocationType, UserType } from "."

type Map = {
  id: string
  name: string
  description: string
  usersPlayed: number
  likes: number
  locations: LocationType[] | number
  previewImg: string
  creator: UserType | string
  avgScore?: number
}

export default Map
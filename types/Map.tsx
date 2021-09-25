import { CoordinateType } from "."

type Map = {
  id: string
  name: string
  description: string
  usersPlayed: number
  likes: number
  locations: CoordinateType[]
  previewImg: string
}

export default Map
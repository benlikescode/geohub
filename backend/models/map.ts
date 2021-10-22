import { ObjectId } from "mongodb"
import User from "./user"

type Map = {
  id: ObjectId | string;
  name: string;
  description: string;
  url?: string;
  previewImg?: string;
  likes: number;
  creator: 'GeoHub' | User
}

export default Map
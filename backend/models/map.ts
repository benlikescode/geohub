import { ObjectId } from "mongodb"
import { LocationType } from "../../types"
import User from "./user"

type Map = {
  id: ObjectId | string;
  slug: string | null;
  name: string;
  description: string;
  previewImg?: string;
  creator: 'GeoHub' | User;
  usersPlayed: number;
  locationCount: number;
  avgScore: number;
  likes: number;
  isPublished?: boolean;
  createdAt?: Date;
  customLocations?: LocationType[];
}

export default Map
import { ObjectId } from "mongodb"

type MapLeaderboard = {
  _id: ObjectId; // gameId
  userId: ObjectId;
  userName: string;
  userAvatar: string;
  totalPoints: number;
  totalTime?: number;
}

export default MapLeaderboard
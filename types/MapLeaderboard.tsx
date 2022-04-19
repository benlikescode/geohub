import { ObjectId } from "mongodb"

type MapLeaderboard = {
  userId: ObjectId;
  userName: string;
  userAvatar: string;
  gameId: ObjectId;
  totalPoints: number;
  totalTime?: number;
  difficulty?: 'Normal' | 'Easy' | 'Challenging';
  countryCode?: string;
}

export default MapLeaderboard
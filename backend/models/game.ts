import { ObjectId } from 'mongodb'
import { GameSettingsType, GuessType, LocationType } from '../../types'

type Game = {
  id?: ObjectId;
  mapId: string;
  mapObjectId: ObjectId;
  mapName?: string;
  userId: ObjectId;
  userName?: string;
  userAvatar?: string;
  gameSettings: GameSettingsType;
  rounds: LocationType[];
  guesses: GuessType[];
  round: number;
  totalPoints: number;
  totalDistance: number;
  totalTime: number;
  difficulty?: 'Normal' | 'Easy' | 'Challenging';
  countryCode?: string;
}

export default Game
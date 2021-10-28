import { ObjectId } from "mongodb"
import { GameSettingsType, GuessType, LocationType } from "../../types"
import Map from "./map"
import User from "./user"

type Game = {
  id?: ObjectId;
  mapId: string;
  mapName?: string;
  userId: string;
  gameSettings: GameSettingsType;
  rounds: LocationType[];
  guesses: GuessType[];
  round: number;
  totalPoints: number;
  totalDistance: number;
}

export default Game
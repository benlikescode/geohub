import { ObjectId } from "mongodb"
import { GameSettingsType, GuessType, LocationType } from "../../types"
import Map from "./map"
import User from "./user"

type Game = {
  id: ObjectId;
  map: Map;
  gameSettings: GameSettingsType;
  rounds: LocationType[];
  guesses: GuessType[];
  player: User | string;
}

export default Game
import { ObjectId } from 'mongodb'
import { Game } from '@backend/models'
import { collections } from '@backend/utils'
import { ChallengeType, GameType } from '@types'
import { COUNTRY_STREAKS_ID, OFFICIAL_WORLD_ID } from '@utils/constants/random'

const getMapFromGame = async (game: GameType | Game | ChallengeType) => {
  const mapId = game.isDailyChallenge || game.mapId === COUNTRY_STREAKS_ID ? OFFICIAL_WORLD_ID : game.mapId
  const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  return mapDetails
}

export default getMapFromGame

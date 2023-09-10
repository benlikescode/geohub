import { OFFICIAL_WORLD_ID } from '@backend/constants/ids'
import { Game } from '@backend/models'
import { collections } from '@backend/utils'
import { ChallengeType, GameType } from '@types'

const getMapFromGame = async (game: GameType | Game | ChallengeType) => {
  const mapId = game.isDailyChallenge || game.mode === 'streak' ? OFFICIAL_WORLD_ID : game.mapId
  const mapDetails = await collections.maps?.findOne({ _id: mapId })

  return mapDetails
}

export default getMapFromGame

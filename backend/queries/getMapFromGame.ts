import { OFFICIAL_WORLD_ID } from '@backend/constants/ids'
import { GameModel } from '@backend/models'
import { collections } from '@backend/utils'
import { ChallengeType, GameType } from '@types'

const getMapFromGame = async (game: GameType | GameModel | ChallengeType) => {
  const mapId = game.isDailyChallenge || game.mode === 'streak' ? OFFICIAL_WORLD_ID : game.mapId
  const mapDetails = await collections.maps?.findOne({ _id: mapId })

  return mapDetails
}

export default getMapFromGame

import { OFFICIAL_WORLD_ID } from '@backend/constants/ids'
import { ChallengeModel, GameModel } from '@backend/models'
import { collections } from '@backend/utils'

const getMapFromGame = async (game: GameModel | ChallengeModel) => {
  const mapId = game.isDailyChallenge || game.mode === 'streak' ? OFFICIAL_WORLD_ID : game.mapId
  const mapDetails = await collections.maps?.findOne({ _id: mapId })

  return mapDetails
}

export default getMapFromGame

import { GameType } from '@types'
import { COUNTRY_STREAK_DETAILS, DAILY_CHALLENGE_DETAILS } from '@utils/constants/otherGameModeDetails'

const formatMapDetails = (game: GameType, property: 'name' | 'previewImg') => {
  if (game.mode === 'streak') {
    return COUNTRY_STREAK_DETAILS[property]
  }

  if (game.isDailyChallenge) {
    return DAILY_CHALLENGE_DETAILS[property]
  }

  return game.mapDetails?.[property]
}

export default formatMapDetails

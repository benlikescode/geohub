import { GameSettingsType } from '../../@types'
import formatTimeLimit from './formatTimeLimit'

// Returns a formatted string containing info about the game settings
const formatSettingsLabel = (settings: GameSettingsType) => {
  const { timeLimit, canMove, canPan, canZoom } = settings

  // If settings are default
  if (timeLimit === 0 && canMove && canPan && canZoom) {
    return 'Default Settings'
  }

  const time = timeLimit === 0 ? 'No time limit' : `${formatTimeLimit(timeLimit)} per round`

  return `${time} ${!canMove ? '- No move' : ''} ${!canPan ? '- No pan' : ''} ${!canZoom ? '- No zoom' : ''}`
}

export default formatSettingsLabel

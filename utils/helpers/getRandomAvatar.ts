import { BACKGROUND_COLORS, EMOJIS } from '../constants/avatarOptions'
import { randomElement } from './'

const getRandomAvatar = () => {
  const randomEmoji = randomElement(EMOJIS)
  const randomColor = randomElement(BACKGROUND_COLORS)

  return { emoji: randomEmoji, color: randomColor }
}

export default getRandomAvatar

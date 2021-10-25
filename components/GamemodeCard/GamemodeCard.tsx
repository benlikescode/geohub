import { FC } from 'react'
import { StyledGamemodeCard } from '.'
import { Button } from '../System'

type Props = {
  title: string
  titleColor: string
  description: string
  buttonText: string
}

const GamemodeCard: FC<Props> = ({ title, titleColor, description, buttonText }) => {
  return (
    <StyledGamemodeCard titleColor={titleColor}>
      <h2 className="gamemodeTitle">{title}</h2>
      <span className="gamemodeDescription">{description}</span>
      <Button type="solidPurple" width="180px">{buttonText}</Button>
    </StyledGamemodeCard>
  )
}

export default GamemodeCard

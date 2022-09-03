import Link from 'next/link'
import { FC } from 'react'
import { StyledGamemodeCard } from '.'
import { Button } from '@components/System'

type Props = {
  title: string
  titleColor: string
  description: string
  buttonText: string
  href?: string
  isNew?: boolean
}

const GamemodeCard: FC<Props> = ({ title, titleColor, description, buttonText, href, isNew }) => {
  return (
    <StyledGamemodeCard titleColor={titleColor}>
      <div className="titleWrapper">
        <h2 className="gamemodeTitle">{title}</h2>
        {isNew && (
          <div className="newTag">
            <span>New</span>
          </div>
        )}
      </div>
      <span className="gamemodeDescription">{description}</span>

      {href && (
        <Link href={href}>
          <a>
            <Button type="solidPurple" width="180px">
              {buttonText}
            </Button>
          </a>
        </Link>
      )}

      {!href && (
        <Button type="solidPurple" width="180px">
          {buttonText}
        </Button>
      )}
    </StyledGamemodeCard>
  )
}

export default GamemodeCard

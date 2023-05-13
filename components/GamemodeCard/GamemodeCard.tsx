import Link from 'next/link'
import { FC } from 'react'

import { Button } from '@components/System'

import { StyledGamemodeCard } from './'

type Props = {
  title: string
  titleColor: string
  description: string
  buttonText: string
  href?: string
}

const GamemodeCard: FC<Props> = ({ title, titleColor, description, buttonText, href }) => {
  return (
    <StyledGamemodeCard titleColor={titleColor}>
      <div className="gamemode-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {href && (
        <Link href={href}>
          <a>
            <Button type="solidCustom" backgroundColor="#4f46e5" color="#fff">
              {buttonText}
            </Button>
          </a>
        </Link>
      )}
      {/*#1837a3*/}
      {!href && (
        <Button type="solidCustom" backgroundColor="#4f46e5" color="#fff">
          {buttonText}
        </Button>
      )}
    </StyledGamemodeCard>
  )
}

export default GamemodeCard

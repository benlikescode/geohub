import Link from 'next/link'
import router from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledGamemodeCard } from '.'
import { mailman } from '../../backend/utils/mailman'
import { selectUser } from '../../redux/user'
import { UserType } from '../../types'
import { Button } from '../System'

type Props = {
  type: 'aerial' | 'learn' | 'challenge';
  title: string;
  titleColor: string;
  description: string;
  buttonText: string;
  href?: string;
}

const GamemodeCard: FC<Props> = ({ type, title, titleColor, description, buttonText, href }) => {
  const user: UserType = useSelector(selectUser)

  const handlePlayAerial = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    const gameData = { 
      userId: user.id,
    }

    const { status, res } = await mailman('aerial', 'POST', JSON.stringify(gameData))
    
    if (status === 400) {
      alert("Game could not be created, try again later.")  
    }
    else {
      router.push(`/aerial/${res}`)
    }
  }

  return (
    <StyledGamemodeCard titleColor={titleColor}>
      <h2 className="gamemodeTitle">{title}</h2>
      <span className="gamemodeDescription">{description}</span>

      {href && (
        <Link href={href}>
          <a>
            <Button type="solidPurple" width="180px">{buttonText}</Button>
          </a>    
        </Link>  
      )}

      {!href && (type === 'aerial') && <Button type="solidPurple" callback={handlePlayAerial} width="180px">{buttonText}</Button>}
      {!href && (type !== 'aerial') && <Button type="solidPurple" width="180px">{buttonText}</Button>}
    </StyledGamemodeCard>
  )
}

export default GamemodeCard

import { useRouter } from 'next/router'
import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyledChallengeStart } from '.'
import { selectUser } from '../../redux/user'
import { ChallengeType } from '../../types'
import { Avatar, Button } from '../System'

type Props = {
  challengeData: ChallengeType
  handleStartChallenge: (challengeData: ChallengeType) => void
  setView: (view: 'Start' | 'Game' | 'Result' | 'FinalResults') => void
}

const ChallengeStart: FC<Props> = ({ challengeData, handleStartChallenge, setView }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const user = useSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    if (!user.id) {
      setIsLoggedIn(false)
    }
  }, [])

  const handleButtonClick = async () => {
    if (isLoggedIn) {
      handleStartChallenge(challengeData)
      setView('Game')
    } else {
      router.push('/register')
    }
  }

  return (
    <StyledChallengeStart>
      <h1>You have been challenged!</h1>
      <div>
        <Avatar
          url={`/images/avatars/${challengeData.creatorAvatar}.jpg`}
          size={40}
          alt="Challenge Creator Avatar"
        />
        <span>{`${challengeData.creatorName} has challenged you to play GeoHub`}</span>
      </div>

      <Button type="solidPurple" callback={() => handleButtonClick()}>
        {isLoggedIn ? 'Play Game' : 'Create Account'}
      </Button>
    </StyledChallengeStart>
  )
}

export default ChallengeStart

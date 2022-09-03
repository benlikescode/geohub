import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { CountrySelect } from '@components/CountrySelect'
import { Banner } from '@components/Layout'
import { Avatar, Button, Checkbox, FlexGroup, Icon } from '@components/System'
import { XIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { UserType } from '@types'

import { StyledAerialSettings } from './'

type Props = {
  closeModal: () => void
}

const AerialSettings: FC<Props> = ({ closeModal }) => {
  const [difficulty, setDifficulty] = useState('Normal')
  const [countryCode, setCountryCode] = useState('')
  const router = useRouter()
  const user: UserType = useSelector(selectUser)

  const handleStartGame = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    const gameData = {
      userId: user.id,
      difficulty,
      countryCode,
    }

    const { status, res } = await mailman('aerial', 'POST', JSON.stringify(gameData))

    if (status === 400) {
      alert('Game could not be created, try again later.')
    } else {
      router.push(`/aerial/${res}`)
    }
  }

  return (
    <StyledAerialSettings>
      <Banner>
        <div className="header">
          <h2>Start Game</h2>
          <Button type="icon" callback={() => closeModal()}>
            <Icon size={30} hoverColor="var(--color2)">
              <XIcon />
            </Icon>
          </Button>
        </div>

        <div className="mainContent">
          <div className="flexTest">
            <div className="mapAvatar">
              <Avatar url="/images/mapPreviews/testAerial.jpg" alt="Satelite View" size={80} outline />
            </div>
            <div className="mapInfo">
              <span className="mapName">Aerial</span>
              <p className="mapDescription">Can you pinpoint a city looking down from the sky?</p>
            </div>
          </div>

          <div className="gameOptions">
            <div className="difficultyWrapper">
              <label>Difficulty</label>
              <div className="difficultyOption">
                <Checkbox isChecked={difficulty === 'Normal'} setChecked={() => setDifficulty('Normal')} />
                <span>Normal</span>
              </div>

              <div className="difficultyOption">
                <Checkbox isChecked={difficulty === 'Easy'} setChecked={() => setDifficulty('Easy')} />
                <span>Easy</span>
              </div>

              <div className="difficultyOption">
                <Checkbox isChecked={difficulty === 'Challenging'} setChecked={() => setDifficulty('Challenging')} />
                <span>Challenging</span>
              </div>
            </div>

            <div className="countrySelector">
              <label>Country</label>
              <CountrySelect onChange={setCountryCode} />
            </div>
          </div>
        </div>

        <div className="footer">
          <Button type="ghost" callback={() => closeModal()} height="35px">
            Cancel
          </Button>

          <Button type="solidPurple" callback={() => handleStartGame()} height="35px">
            Start Game
          </Button>
        </div>
      </Banner>
    </StyledAerialSettings>
  )
}

export default AerialSettings

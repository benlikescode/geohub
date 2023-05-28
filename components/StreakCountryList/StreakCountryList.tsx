/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import Game from '@backend/models/game'
import countries from '../../utils/constants/countries'
import { StyledStreakCountryList } from './'

type Props = {
  gameData: Game
}

type Round = {
  name: string
  flag: string
  guessedCountry: string
}

const StreakCountryList: FC<Props> = ({ gameData }) => {
  const [formattedRounds, setFormattedRounds] = useState<Round[]>([])

  const getFormattedRounds = () => {
    let formatted: Round[] = []

    gameData.rounds.map((round, idx) => {
      if (idx > gameData.streak) return

      const name = countries.find((x) => x.code === round.countryCode)?.name || ''
      const flag = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${round.countryCode?.toUpperCase()}.svg`

      const guessedWrong = idx === gameData.streak
      const guessedCountryCode = guessedWrong ? gameData.guesses[idx]?.streakLocationCode : ''
      const guessedCountry = countries.find((x) => x.code === guessedCountryCode)?.name || ''

      formatted.push({ name, flag, guessedCountry })
    })

    setFormattedRounds(formatted)
  }

  useEffect(() => {
    getFormattedRounds()
  }, [gameData])

  return (
    <StyledStreakCountryList>
      {formattedRounds.map((round, idx) => (
        <li key={idx} className="streak-result-item">
          <div className="result-number">{idx + 1}.</div>

          <div className="result-flag">
            <img src={round.flag} alt="" />
          </div>

          <div className="result-name">
            {round.name}
            {round.guessedCountry && <div className="result-guessed-name">{`You guessed ${round.guessedCountry}`}</div>}
          </div>
        </li>
      ))}
    </StyledStreakCountryList>
  )
}

export default StreakCountryList

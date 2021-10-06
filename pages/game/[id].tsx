import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { StreetView } from '../../components/StreetView'
import { Map } from '../../components/Map'
import { LocationType } from '../../types'
import { ResultView } from '../../components/ResultView'
import { resetGame, selectGame } from '../../redux/game'
import { useDispatch, useSelector } from 'react-redux'
import { FinalResultsView } from '../../components/FinalResultsView'
import { StreetViewControls } from '../../components/StreetViewControls'
import { GameStatus } from '../../components/GameStatus'
import { CanadaCities, generateCanada, generateLocations, generateUS, generateUSCity, getRandomLocationInRadius } from '../../utils/functions/generateLocations'
import { OldStreetView } from '../../components/OldStreetView'

const GamePage: NextPage = () => {
  const game = useSelector(selectGame)
  const [compassHeading, setCompassHeading] = useState(0)
  const [locations, setLocations] = useState<LocationType[]>([])
  const dispatch = useDispatch()
/*
  const locations = [
    {lat: 36.56128686060616, lng: -91.12202786978625},
    {lat: -33.75012814032746, lng: 18.61295255216512},
    {lat: 35.9128264152442, lng: -87.61140660553662},
    {lat: -1.263813190243825, lng: 36.88701095392188},
    {lat: 37.17057338007954, lng: -92.55305293592208},
  ]
  */

  useEffect(() => {
    const locations = generateUS()
    console.log(locations)
    setLocations(locations)
    return () => {
      dispatch(resetGame({}))
    }
  }, [])


 

  return (
    <>
    {game.currView === 'Game' &&
    <>
      <OldStreetView location={locations[game.round - 1]} zoom={11} setCompassHeading={setCompassHeading}/>
      <StreetViewControls compassHeading={compassHeading} />
      <GameStatus />
   
      <Map 
        coordinate={locations[game.round - 1] || locations[0]} 
        zoom={8} 
      />
    </>
    }

    {game.currView === 'Result' &&
      <>
        <ResultView guessedLocation={game.currGuess} actualLocation={locations[game.round - 1] || locations[0]} currRound={game.round}/>
      </>
    }

    {game.currView === 'FinalResults' &&
      <>
        <FinalResultsView guessedLocations={game.guessedLocations} actualLocations={locations}/>
      </>
    } 
    </> 
  )
}

export default GamePage

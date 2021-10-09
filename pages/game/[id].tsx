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
import { Brazil, CanadaCities, Europe, FamousLocations, generateCanada, generateLocations, generateUS, getRandomLocationsInRadius } from '../../utils/functions/generateLocations'
import { OldStreetView } from '../../components/OldStreetView'
import { Map2 } from '../../components/Map2'

const GamePage: NextPage = () => {
  const game = useSelector(selectGame)
  const [compassHeading, setCompassHeading] = useState(0)
  const [locations, setLocations] = useState<LocationType[]>([])
  const dispatch = useDispatch()

  const getLocations = async () => {
    const locations: any = FamousLocations
    console.log(locations)
    setLocations(locations)
  }

  useEffect(() => {
    getLocations()

    return () => {
      dispatch(resetGame({}))
    }
  }, [])


  return (
    <>
    {game.currView === 'Game' &&
    <>
      <StreetView location={locations[game.round - 1]} zoom={11} setCompassHeading={setCompassHeading}/>
      <StreetViewControls compassHeading={compassHeading} />
      <GameStatus />
   
      <Map2 
        coordinate={locations[game.round - 1] || locations[0]} 
        zoom={8} 
      />
    </>
    }

    {game.currView === 'Result' && <ResultView />}

    {game.currView === 'FinalResults' && <ResultView isFinalResults />}
    </>
  )
}

export default GamePage

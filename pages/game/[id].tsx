import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Game } from '../../components/Game'
import { StreetView } from '../../components/StreetView'
import { Map } from '../../components/Map'
import { generateLocations, generateUS, testLocation } from '../../utils/helperFunctions'
import { LocationType } from '../../types'
import { ResultView } from '../../components/ResultView'
import { selectGame } from '../../redux/game'
import { useSelector } from 'react-redux'
import { FinalResultsView } from '../../components/FinalResultsView'

const GamePage: NextPage = () => {
  const game = useSelector(selectGame)

  const locations = [
    {lat: 36.56128686060616, lng: -91.12202786978625},
    {lat: 35.77289217620601, lng: -85.09555176667031},
    {lat: 35.9128264152442, lng: -87.61140660553662},
    {lat: 36.24188381208464, lng: -88.28262971203432},
    {lat: 37.17057338007954, lng: -92.55305293592208},
  ]

  return (
    <>
    {game.currView === 'Game' &&
    <>
      <StreetView location={locations[game.round - 1] || locations[0]} zoom={11} />      
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

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { StreetView } from '../../components/StreetView'
import { Map } from '../../components/Map'
import { LocationType, MapType } from '../../types'
import { ResultView } from '../../components/ResultView'
import { resetGame, selectGame } from '../../redux/game'
import { useDispatch, useSelector } from 'react-redux'
import { FinalResultsView } from '../../components/FinalResultsView'
import { StreetViewControls } from '../../components/StreetViewControls'
import { GameStatus } from '../../components/GameStatus'
import { Brazil, CanadaCities, Europe, FamousLocations, generateCanada, generateLocations, generateUS, getLocationsFromMapId, getRandomLocationsInRadius } from '../../utils/functions/generateLocations'
import { OldStreetView } from '../../components/OldStreetView'
import { Map2 } from '../../components/Map2'
import { fireDb } from '../../utils/firebaseConfig'

export const getStaticPaths: GetStaticPaths = async () => {
  const maps = await fireDb.collection('maps').get()
  const paths = maps.docs.map(doc => {
    return {
      params: { id: doc.id }
    }
  })
  
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const mapId = context.params!.id as string
  const mapRaw = await fireDb.collection('maps').doc(mapId).get()
  const mapData = {
    id: mapRaw.id,
    ...mapRaw.data()
  } as MapType

  if (!mapRaw) {
    return {
      notFound: true,
    }
  }

  return {
    props: { mapData }
  }
}

type Props = {
  mapData: MapType
}

const GamePage: FC<Props> = ({ mapData }) => {
  const game = useSelector(selectGame)
  const [locations, setLocations] = useState<LocationType[]>([])
  const dispatch = useDispatch()

  const getLocations = async () => {
    // if we are loading a custom players map
    if (mapData.creator !== 'GeoHub') {
      if (typeof(mapData.locations) !== 'number') {
        setLocations(mapData.locations)
      }
      else {
        setLocations([])
      }     
    }
    // if we are loading a GeoHub map
    else {
      const locations = getLocationsFromMapId(mapData.id, 'handPicked')
      setLocations(locations)
    }
    console.log(locations)   
  }

  useEffect(() => {
    getLocations()

    return () => {
      dispatch(resetGame({}))
    }
  }, [])

  return (
    <>
    {game.currView === 'Game' && <StreetView location={locations[game.round - 1]} />}
  
    {game.currView === 'Result' && <ResultView />}

    {game.currView === 'FinalResults' && <ResultView isFinalResults />}
    </>
  )
}

export default GamePage

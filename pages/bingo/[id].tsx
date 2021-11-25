import type { NextPage } from 'next'
import React, { useState } from 'react'
import StyledBingoGamePage from '../../styles/BingoGamePage.Styled'
import GoogleMapReact from 'google-map-react'
import { BingoCard } from '../../components/BingoCard'
import { Button } from '../../components/System'

const BingoPlayPage: NextPage = () => {
  const [showCard, setShowCard] = useState(true)
  const [foundItems, setFoundItems] = useState<number[]>([4])
  const googleKey = process.env.GOOGLE_API_KEY as string

  const toggleCard = () => {
    setShowCard(prev => !prev)
  }

  const GoogleMapConfig = {
    key: googleKey,
  }

  const testBingoCard = [
    "Helicopter",
    "Fire",
    "Beach",
    "Statue",
    "Bus",
    "Pigeon",
    "Taxi",
    "Grafiti"
  ]

  testBingoCard.splice(4, 0, 'Free')

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 2  
      }
    )
  }

  return (
    <StyledBingoGamePage>
      <div id="map">

      </div>
      <BingoCard 
        bingoItems={testBingoCard} 
        isVisible={showCard} 
        foundItems={foundItems} 
        setFoundItems={setFoundItems} 
      />
      <div className="toggleCardBtn">
        <Button type="solidGray" callback={() => toggleCard()}>Toggle Card</Button>
      </div>

      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        center={{lat: 0, lng: 0}} 
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
      </GoogleMapReact>

    </StyledBingoGamePage> 
  )
}

export default BingoPlayPage
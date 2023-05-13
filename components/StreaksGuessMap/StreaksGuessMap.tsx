/* eslint-disable @next/next/no-img-element */
import GoogleMapReact from 'google-map-react'
import React, { FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Marker } from '@components/Marker'
import { Icon } from '@components/System'
import { Button } from '@components/System/Button'
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateGuessMapSize } from '@redux/slices'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { multiPolygon, point, polygon } from '@turf/turf'
import { LocationType } from '@types'
import countryBounds from '@utils/constants/countryBoundsOld.json'
import { createMarker, getGuessMapDimensions, getMapTheme } from '@utils/helperFunctions'
import { StyledStreaksGuessMap } from './'

type Props = {
  coordinate: LocationType
  zoom: number
  countryStreakGuess: string
  setCountryStreakGuess: (countryStreakGuess: string) => void
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
}

const StreaksGuessMap: FC<Props> = ({
  coordinate,
  zoom,
  countryStreakGuess,
  setCountryStreakGuess,
  mobileMapOpen,
  closeMobileMap,
  handleSubmitGuess,
}) => {
  const [mapHeight, setMapHeight] = useState(15) // height in vh
  const [mapWidth, setMapWidth] = useState(15) // width in vw
  const [hovering, setHovering] = useState(false)
  const [countries, setCountries] = useState<any>([])
  const [selectedCountryName, setSelectedCountryName] = useState('')
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const prevCountriesRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const hoverDelay = useRef<any>()
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)

  const GoogleMapConfig = {
    key: googleKey,
  }

  // const handleApiLoaded = () => {
  //   const map = new window.google.maps.Map(document.getElementById('guessMap') as HTMLElement, {
  //     zoom: 2,
  //     center: { lat: 0, lng: 0 },
  //     disableDefaultUI: true,
  //     styles: getMapTheme('Light'),
  //     clickableIcons: false,
  //     gestureHandling: 'greedy',
  //   })

  //   clearMarkers(prevMarkersRef.current)

  //   window.google.maps.event.addListener(map, 'click', (e: any) => {
  //     const location = {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //     }
  //     setCurrGuess(location)

  //     const marker = createMarker(location, map, `/images/markers/testMarker2.png`)
  //     clearMarkers(prevMarkersRef.current)
  //     prevMarkersRef.current.push(marker)
  //   })
  // }

  // const clearMarkers = (markers: google.maps.Marker[]) => {
  //   markers.map((marker) => marker.setMap(null))
  // }

  const handleMapHover = () => {
    clearInterval(hoverDelay.current)
    setHovering(true)

    const { width, height } = getGuessMapDimensions(user.guessMapSize as number)
    setMapHeight(height)
    setMapWidth(width)
  }

  const handleMapLeave = () => {
    hoverDelay.current = setTimeout(() => {
      setHovering(false)
      setMapHeight(15)
      setMapWidth(15)
    }, 700)
  }

  const changeMapSize = (change: 'increase' | 'decrease') => {
    let newMapSize = 1

    if (change === 'increase' && (user.guessMapSize as number) < 4) {
      newMapSize = (user.guessMapSize as number) + 1
    } else if (change === 'decrease' && (user.guessMapSize as number) > 1) {
      newMapSize = (user.guessMapSize as number) - 1
    }

    const { width, height } = getGuessMapDimensions(newMapSize)
    setMapHeight(height)
    setMapWidth(width)

    dispatch(updateGuessMapSize({ guessMapSize: newMapSize }))
  }

  // const addMarker = (e: any) => {
  //   const location = {
  //     lat: e.lat(),
  //     lng: e.lng(),
  //   }
  //   setCurrGuess(location)
  //   setMarker(location)
  // }

  const onInit = (map: any, maps: any) => {
    maps.event.addListener(map, 'click', (e: any) => {
      const clickedCoords = [e.latLng.lng(), e.latLng.lat()]

      const turfPoint = point(clickedCoords)

      const countryPolygons = countryBounds as any

      countryPolygons.features.map((country: any) => {
        /*
        const currentCountry = new google.maps.Polygon({
          paths: [[country.geometry.coordinates[0]]],
          //strokeColor: 'white',

          //title: country.country,
          //code: country.iso,
          strokeOpacity: 1,
          //strokeWeight: 1,
          //fillColor: country['color'], // can be used as default color
          fillOpacity: 1,
          fillColor: 'red',
          map: map,
        })
        */

        let turfPolygon = null

        if (country.geometry.coordinates?.[0]?.[0]?.[0]?.[0]) {
          turfPolygon = multiPolygon(country.geometry.coordinates)
        } else {
          turfPolygon = multiPolygon([country.geometry.coordinates])
        }

        //console.log(turfPolygon)

        const isPointInThisCountry = booleanPointInPolygon(turfPoint, turfPolygon)

        if (isPointInThisCountry) {
          if (prevCountriesRef.current) {
            prevCountriesRef.current.map((feature: any) => {
              map.data.remove(feature)
            })
          }

          const newCountry = map.data.addGeoJson(country)
          map.data.setStyle({
            fillColor: '#b2677c',
            strokeColor: '#b2677c',
            strokeOpacity: 0.5,
            fillOpacity: 0.5,
            cursor: 'crosshair',
          })
          prevCountriesRef.current = newCountry

          console.log(country?.properties?.ADMIN)

          setSelectedCountryName(country?.properties?.name)

          setCountryStreakGuess(country?.properties?.code)
          //setSelectedCountryCode(country.)

          // const currentCountry = new google.maps.Polygon({
          //   paths: country.geometry.coordinates,
          //   //strokeColor: 'white',

          //   //title: country.country,
          //   //code: country.iso,
          //   strokeOpacity: 1,
          //   //strokeWeight: 1,
          //   //fillColor: country['color'], // can be used as default color
          //   fillOpacity: 1,
          //   fillColor: 'red',
          //   map: map,
          // })
        }

        //console.log(isPointInThisCountry)
      })

      //console.log(clickedCoords)
    })
  }

  //   const onInit = (map: any, maps: any) => {
  //     /*
  //     maps.event.addListener(map, 'click', (e: any) => {
  //       addMarker(e.latLng)
  //     })
  // */
  //     function showCountries() {
  //       for (var i = 0; i < countries.length; i++) {
  //         countries[i].setMap(map)

  //         google.maps.event.addListener(countries[i], 'click', function () {
  //           countries[i].setOptions({ fillColor: '#f5c879', fillOpacity: 0.5 })
  //         })
  //       }
  //     }

  //     function createCountry(coords: any, country: any) {
  //       //const countries = [] as any[]
  //       //console.log(coords.map((coord: any) => console.log(coord.lat())))

  //       var currentCountry = new google.maps.Polygon({
  //         paths: coords,
  //         //strokeColor: 'white',

  //         //title: country.country,
  //         //code: country.iso,
  //         strokeOpacity: 0,
  //         //strokeWeight: 1,
  //         //fillColor: country['color'], // can be used as default color
  //         fillOpacity: 0,
  //         map: map,
  //       })

  //       //countries.push(currentCountry)
  //       //setCountries(countries)

  //       google.maps.event.addListener(currentCountry, 'click', function () {
  //         prevCountriesRef.current.map((prev: any) => prev.setOptions({ fillColor: 'red', fillOpacity: 0 }))
  //         prevCountriesRef.current.push(currentCountry)
  //         currentCountry.setOptions({ fillColor: 'red', fillOpacity: 1 })
  //       })
  //     }

  //     countryBounds.map((country) => {
  //       var countryCoords
  //       var ca
  //       var co

  //       //console.log(country)

  //       if ('multi' in country) {
  //         var ccArray = []

  //         for (var t in country['xml']['Polygon']) {
  //           countryCoords = []

  //           co = country['xml']['Polygon'][t as any]['outerBoundaryIs']['LinearRing']['coordinates'].split(' ')

  //           for (var i in co) {
  //             ca = co[i].split(',')

  //             countryCoords.push(new google.maps.LatLng(Number(ca[1]), Number(ca[0])))
  //           }

  //           ccArray.push(countryCoords)
  //         }

  //         createCountry(ccArray, country)
  //       } else {
  //         countryCoords = []

  //         co = country['xml']['outerBoundaryIs']['LinearRing']['coordinates'].split(' ')

  //         for (var j in co) {
  //           ca = co[j].split(',')

  //           countryCoords.push(new google.maps.LatLng(Number(ca[1]), Number(ca[0])))
  //         }

  //         createCountry(countryCoords, country)
  //       }
  //     })
  //     //showCountries()

  //     /*
  //     var BucaramangaDelimiters = [
  //       { lng: -73.077796936035, lat: 7.18019914627087 },
  //       { lng: -73.0765991210938, lat: 7.17500114440924 },
  //       { lng: -73.0805969238281, lat: 7.16109991073608 },
  //       { lng: -73.081199645996, lat: 7.14789915084839 },
  //       { lng: -73.0748977661132, lat: 7.13860082626343 },
  //       { lng: -73.0655975341797, lat: 7.13280010223394 },
  //       { lng: -73.0626983642578, lat: 7.12929916381836 },
  //       { lng: -73.0673980712889, lat: 7.1263999938966 },
  //       { lng: -73.0759963989258, lat: 7.10970115661621 },
  //       { lng: -73.084098815918, lat: 7.10449981689459 },
  //       { lng: -73.0943984985352, lat: 7.09769916534424 },
  //       { lng: -73.1088027954102, lat: 7.08269977569586 },
  //       { lng: -73.1156997680664, lat: 7.07289981842052 },
  //       { lng: -73.1231994628906, lat: 7.07060003280645 },
  //       { lng: -73.1300964355469, lat: 7.05680179595953 },
  //       { lng: -73.1393966674804, lat: 7.05340003967291 },
  //       { lng: -73.1473999023437, lat: 7.05050086975098 },
  //       { lng: -73.152099609375, lat: 7.05919981002808 },
  //       { lng: -73.1601028442383, lat: 7.06330013275158 },
  //       { lng: -73.1688003540039, lat: 7.06389999389648 },
  //       { lng: -73.1802978515624, lat: 7.06629991531383 },
  //       { lng: -73.1843032836913, lat: 7.07320117950451 },
  //       { lng: -73.1860961914062, lat: 7.08760023117071 },
  //       { lng: -73.1884002685546, lat: 7.1096010208131 },
  //       { lng: -73.1815032958984, lat: 7.12750101089489 },
  //       { lng: -73.1780014038085, lat: 7.15230083465588 },
  //       { lng: -73.1781005859374, lat: 7.17660093307501 },
  //       { lng: -73.1763000488281, lat: 7.18930006027233 },
  //       { lng: -73.1770782470703, lat: 7.19456291198725 },
  //       { lng: -73.1682968139647, lat: 7.19389915466314 },
  //       { lng: -73.1636962890624, lat: 7.1995987892152 },
  //       { lng: -73.1591033935547, lat: 7.20250082016003 },
  //       { lng: -73.1452026367187, lat: 7.211100101471 },
  //       { lng: -73.1360015869141, lat: 7.21739912033081 },
  //       { lng: -73.1261978149414, lat: 7.22079992294312 },
  //       { lng: -73.1199035644531, lat: 7.22370100021362 },
  //       { lng: -73.1118011474609, lat: 7.2241997718811 },
  //       { lng: -73.1078033447265, lat: 7.22540187835699 },
  //       { lng: -73.1054992675781, lat: 7.22540187835699 },
  //       { lng: -73.1054992675781, lat: 7.22129917144787 },
  //       { lng: -73.1048965454102, lat: 7.21269989013683 },
  //       { lng: -73.1048965454102, lat: 7.20340108871466 },
  //       { lng: -73.1031036376953, lat: 7.19760084152222 },
  //       { lng: -73.0973968505859, lat: 7.1911988258363 },
  //       { lng: -73.0915985107421, lat: 7.18540000915522 },
  //       { lng: -73.0864028930664, lat: 7.18370008468634 },
  //       { lng: -73.077796936035, lat: 7.18019914627087 },
  //     ]

  //     const country = new google.maps.Polygon({
  //       paths: BucaramangaDelimiters, //(bounds as any).features[0].geometry.coordinates,
  //       strokeColor: 'red',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 2,
  //       fillColor: 'red',
  //       fillOpacity: 0.35,
  //       map: map,
  //     })

  //     country.setVisible(false)

  //     country.addListener('click', () => country.setVisible(true))
  //     */
  //   }

  return (
    <StyledStreaksGuessMap mapHeight={mapHeight} mapWidth={mapWidth} mobileMapOpen={mobileMapOpen}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering && (
          <div className="controls">
            <button
              className={`controlBtn increase ${user.guessMapSize === 4 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('increase')}
              disabled={user.guessMapSize === 4}
            >
              <ArrowRightIcon />
            </button>

            <button
              className={`controlBtn decrease ${user.guessMapSize === 1 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('decrease')}
              disabled={user.guessMapSize === 1}
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={GoogleMapConfig}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onInit(map, maps)}
            //onClick={(e) => addMarker(e)}
            options={{
              disableDefaultUI: true,
              styles: getMapTheme('Light'),
              clickableIcons: false,
              gestureHandling: 'greedy',
              minZoom: 1,
              draggableCursor: 'crosshair',
            }}
          >
            {marker && (
              <Marker lat={marker.lat} lng={marker.lng} type="guess" userAvatar={user.avatar} isFinalResults={false} />
            )}
          </GoogleMapReact>

          {countryStreakGuess && selectedCountryName && (
            <div className="selected-country">
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryStreakGuess?.toUpperCase()}.svg`}
                alt={countryStreakGuess}
              />
              <span>{selectedCountryName}</span>
            </div>
          )}
        </div>

        <button className="close-map-button" onClick={closeMobileMap}>
          <XIcon />
        </button>

        <div className="submit-button-wrapper">
          <Button width="100%" disabled={!countryStreakGuess} onClick={() => handleSubmitGuess}>
            Submit Guess
          </Button>
        </div>
      </div>
    </StyledStreaksGuessMap>
  )
}

export default StreaksGuessMap

import { FC, useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { GoogleMapsConfigType, LocationType } from '@types'
import { useClickOutside } from '@utils/hooks'
import { StyledGoogleMapsSearch } from './'

type ResultItem = {
  id: string
  bbox: number[]
  center: number[]
  place: string
  country: string
}

type Props = {
  placeholder?: string
  autoFocus?: boolean
  googleMapsConfig: GoogleMapsConfigType
  addNewLocations: (locations: LocationType[]) => void
}

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
const MAPBOX_GEOCODING_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

const GoogleMapsSearch: FC<Props> = ({ placeholder, autoFocus, googleMapsConfig, addNewLocations }) => {
  const [query, _setQuery] = useState('')
  const [results, setResults] = useState<ResultItem[]>([])
  const [isFocused, _setIsFocused] = useState(autoFocus || false)

  const queryRef = useRef('')
  const inputElementRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef(null)
  const isFocusedRef = useRef(autoFocus || false)

  useClickOutside(wrapperRef, () => handleClickOutside())

  const setIsFocused = (newVal: boolean) => {
    isFocusedRef.current = newVal
    _setIsFocused(newVal)
  }

  const setQuery = (newVal: string) => {
    queryRef.current = newVal
    _setQuery(newVal)
  }

  const handleClickOutside = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    const throttle = setTimeout(() => {
      if (query) {
        handleSearch()
      } else {
        setResults([])
      }
    }, 300)

    return () => {
      clearTimeout(throttle)
    }
  }, [query])

  const handleSearch = async () => {
    const streetViewLinkRegex = /^https:\/\/www\.google\.com\/maps\/@(-?\d+\.\d+),(-?\d+\.\d+),/

    if (streetViewLinkRegex.test(query)) {
      return handleGoogleLinkPaste()
    }

    handleSearchPlaces()
  }

  const handleGoogleLinkPaste = () => {
    const str1 = query.split('@')[1]
    if (!str1) return

    const str2 = str1.split('/')[0]
    if (!str2) return

    const [lat, lng, _, __, heading, pitch] = str2.split(',')

    if (!lat || !lng) return

    const parsedLat = parseFloat(lat)
    const parsedLng = parseFloat(lng)
    const parsedHeading = parseFloat(heading)
    const parsedPitch = parseFloat(pitch)

    if (!parsedLat || !parsedLng) return

    const location: LocationType = {
      lat: parsedLat,
      lng: parsedLng,
      heading: parsedHeading || 0,
      pitch: parsedPitch - 90 || 0,
    }

    addNewLocations([location])
  }

  const handleSearchPlaces = async () => {
    const res = await fetch(
      `${MAPBOX_GEOCODING_BASE}/${query}.json?autocomplete=1&access_token=${MAPBOX_API_KEY}&language=en`
    )

    const searchResults = await res.json()

    if (!searchResults || !searchResults.features) return

    const goodResults = [] as ResultItem[]

    searchResults.features.map((result: any) => {
      const split = result.place_name.split(',')

      if (!split || !split.length) return null

      const place = split[0]
      const country = split.slice(1).join(',')

      if (!result.bbox && !result.center) return null

      goodResults.push({
        id: result.id,
        bbox: result.bbox,
        center: result.center,
        place,
        country,
      })
    })

    setResults(goodResults)
  }

  const handlePanToLocation = (resultItem: ResultItem) => {
    if (!googleMapsConfig) return

    const { map } = googleMapsConfig

    if (resultItem.bbox) {
      const [minLng, minLat, maxLng, maxLat] = resultItem.bbox

      const swLatLng = new google.maps.LatLng(minLat, minLng)
      const neLatLng = new google.maps.LatLng(maxLat, maxLng)

      const bounds = new google.maps.LatLngBounds(swLatLng, neLatLng)

      map.fitBounds(bounds)
      map.setCenter(bounds.getCenter())
    }

    if (resultItem.center) {
      const [lng, lat] = resultItem.center

      const centerLatLng = new google.maps.LatLng(lat, lng)

      map.setCenter(centerLatLng)
      map.setZoom(16)
    }

    setQuery(resultItem.place)
    setIsFocused(false)
  }

  return (
    <StyledGoogleMapsSearch ref={wrapperRef}>
      <div className="searchbar-wrapper">
        <input
          type="text"
          placeholder={placeholder ? placeholder : 'Search or paste link'}
          onChange={(e) => setQuery(e.currentTarget.value)}
          autoFocus={autoFocus}
          ref={inputElementRef}
          onFocus={() => setIsFocused(true)}
          onClick={() => setIsFocused(true)}
          value={query}
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>

      {isFocused && results.length > 0 && (
        <div className="results-wrapper">
          {results.map((result) => (
            <div key={result.id} className="result-item" onClick={() => handlePanToLocation(result)}>
              <span className="result-item-place">{result.place}</span>
              <span className="result-item-country">{result.country}</span>
            </div>
          ))}
        </div>
      )}
    </StyledGoogleMapsSearch>
  )
}

export default GoogleMapsSearch

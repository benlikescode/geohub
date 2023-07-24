import { FC, useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { useClickOutside } from '@utils/hooks'
import { StyledGoogleMapsSearch } from './'

type GoogleMapsConfigType = {
  isLoaded: boolean
  selectionMap: google.maps.Map
  mapsApi: typeof google.maps
}

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
}

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
const MAPBOX_GEOCODING_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

const GoogleMapsSearch: FC<Props> = ({ placeholder, autoFocus, googleMapsConfig }) => {
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

    const { selectionMap } = googleMapsConfig

    if (resultItem.bbox) {
      const [minLng, minLat, maxLng, maxLat] = resultItem.bbox

      const swLatLng = new google.maps.LatLng(minLat, minLng)
      const neLatLng = new google.maps.LatLng(maxLat, maxLng)

      const bounds = new google.maps.LatLngBounds(swLatLng, neLatLng)

      selectionMap.fitBounds(bounds)
      selectionMap.setCenter(bounds.getCenter())
    }

    if (resultItem.center) {
      const [lng, lat] = resultItem.center

      const centerLatLng = new google.maps.LatLng(lat, lng)

      selectionMap.setCenter(centerLatLng)
      selectionMap.setZoom(16)
    }

    setQuery(resultItem.place)
    setIsFocused(false)
  }

  return (
    <StyledGoogleMapsSearch ref={wrapperRef}>
      <div className="searchbar-wrapper">
        <input
          type="text"
          placeholder={placeholder ? placeholder : 'Search'}
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

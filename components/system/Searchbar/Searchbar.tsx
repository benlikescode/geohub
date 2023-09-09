import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { SearchResultType } from '@types'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman } from '@utils/helpers'
import { useClickOutside } from '@utils/hooks'
import { StyledSearchbar } from './'
import { SearchOverlayCard } from './SearchOverlayCard'

type Props = {
  placeholder?: string
  autoFocus?: boolean
  isSmall?: boolean
  onClickOutside?: () => void
}

const Searchbar: FC<Props> = ({ placeholder, autoFocus, isSmall, onClickOutside }) => {
  const [query, _setQuery] = useState('')
  const [results, setResults] = useState<SearchResultType[]>([])
  const [isFocused, _setIsFocused] = useState(autoFocus || false)
  const [loadingQueryResults, setLoadingQueryResults] = useState(false)
  const [loadingRecents, setLoadingRecents] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const wrapperRef = useRef(null)
  const router = useRouter()
  const user = useAppSelector((state) => state.user)

  useClickOutside(wrapperRef, () => handleClickOutside())

  const inputElementRef = useRef<HTMLInputElement>(null)
  const isFocusedRef = useRef(autoFocus || false)
  const queryRef = useRef('')

  const setIsFocused = (newVal: boolean) => {
    isFocusedRef.current = newVal
    _setIsFocused(newVal)
  }

  const setQuery = (newVal: string) => {
    queryRef.current = newVal
    _setQuery(newVal)
  }

  const handleClickOutside = () => {
    onClickOutside && onClickOutside()
    setIsFocused(false)
  }

  const handleSearch = async () => {
    if (!queryRef.current) return

    // Add to recent searches if logged in
    if (user.id) {
      const body = { type: 'term', term: queryRef.current }
      await mailman('search/recent', 'POST', JSON.stringify(body))
    }

    setIsFocused(false)
    router.push(`/search?q=${queryRef.current}`)
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (!isFocusedRef.current && e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()

      setIsFocused(true)
    }

    if ((isFocusedRef.current && e.key === KEY_CODES.ESCAPE) || e.key === KEY_CODES.ESCAPE_IE11) {
      setIsFocused(false)
    }

    if (isFocusedRef.current && e.key === KEY_CODES.ENTER) {
      handleSearch()
    }
  }

  // HALP - This is going to fire on every keydown across the site (likely needs work)
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!inputElementRef.current) return

    if (isFocused) {
      inputElementRef.current.focus()
    } else {
      inputElementRef.current.blur()
    }
  }, [isFocused])

  // Gets user's recent searches on mount
  const getRecentSearches = async () => {
    setLoadingRecents(true)

    const res = await mailman(`search/recent`)

    setLoadingRecents(false)

    if (res.error) return

    setRecentSearches(res)
  }

  useEffect(() => {
    if (!user.id) return

    getRecentSearches()
  }, [user.id])

  // Gets search results for specified query
  useEffect(() => {
    if (query) {
      setLoadingQueryResults(true)
    }

    const search = async () => {
      const res = await mailman(`search?q=${query}&count=6`)

      if (!res) {
        return
      }

      setResults([...res.users, ...res.maps])
      setLoadingQueryResults(false)
    }

    const throttle = setTimeout(() => {
      if (query) {
        search()
      } else {
        setResults([])
        setLoadingQueryResults(false)
      }
    }, 300)

    return () => {
      clearTimeout(throttle)
    }
  }, [query])

  return (
    <StyledSearchbar isFocused={isFocused} isSmall={isSmall} ref={wrapperRef}>
      <div className="searchbarWrapper">
        <input
          type="text"
          placeholder={placeholder ? placeholder : 'Search'}
          onChange={(e) => setQuery(e.currentTarget.value)}
          autoFocus={autoFocus}
          ref={inputElementRef}
          onFocus={() => setIsFocused(true)}
          onClick={() => setIsFocused(true)}
        />
        <button className="searchBtn" onClick={() => handleSearch()}>
          <SearchIcon />
        </button>
      </div>

      {isFocused && (recentSearches.length > 0 || !!query.trim()) && (
        <SearchOverlayCard
          results={query ? results : recentSearches}
          query={query}
          isLoading={loadingRecents}
          setIsFocused={setIsFocused}
        />
      )}
    </StyledSearchbar>
  )
}

export default Searchbar

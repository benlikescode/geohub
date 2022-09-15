import { useRouter } from 'next/router'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Button, Icon, Spinner } from '@components/System'
import { SearchIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { SearchResultType } from '@types'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { showErrorToast } from '@utils/helperFunctions'
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
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const wrapperRef = useRef(null)
  const router = useRouter()
  const user = useSelector(selectUser)

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

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (!isFocusedRef.current && e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()

      setIsFocused(true)
    }

    if ((isFocusedRef.current && e.key === KEY_CODES.ESCAPE) || e.key === KEY_CODES.ESCAPE_IE11) {
      setIsFocused(false)
    }

    if (isFocusedRef.current && e.key === KEY_CODES.ENTER) {
      // Add to recently searched
      const { res } = await mailman(
        'search/recent',
        'POST',
        JSON.stringify({ userId: user.id, type: 'term', term: queryRef.current })
      )

      console.log(res)

      setIsFocused(false)
      router.push(`/search?q=${queryRef.current}`)
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
    const { res } = await mailman(`search/recent?userId=${user.id}`)

    if (res.error) return

    console.log(res)
    setRecentSearches(res)
  }

  useEffect(() => {
    if (!user.id) return

    getRecentSearches()
  }, [user.id])

  // Gets search results for specified query
  useEffect(() => {
    if (query) {
      setLoading(true)
    }

    const search = async () => {
      const { res } = await mailman(`search?q=${query}&count=6`)
      setResults(res)
      setLoading(false)
    }

    const throttle = setTimeout(() => {
      if (query) {
        search()
      } else {
        setResults([])
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(throttle)
    }
  }, [query])

  return (
    <StyledSearchbar isFocused={isFocused} isSmall={isSmall} ref={wrapperRef}>
      <div className="searchbarWrapper" onClick={() => setIsFocused(true)}>
        <input
          type="text"
          placeholder={placeholder ? placeholder : 'Search'}
          onChange={(e) => setQuery(e.currentTarget.value)}
          autoFocus={autoFocus}
          ref={inputElementRef}
          onFocus={() => setIsFocused(true)}
        />
        <div className="searchBtn">
          <Button type="icon">
            <Icon size={20} fill="rgba(206, 206, 206, 0.6)">
              {loading ? <Spinner size={20} /> : <SearchIcon />}
            </Icon>
          </Button>
        </div>
      </div>

      {isFocused && (
        <SearchOverlayCard results={query ? results : recentSearches} query={query} setIsFocused={setIsFocused} />
      )}
    </StyledSearchbar>
  )
}

export default Searchbar

import { SearchIcon } from '@heroicons/react/outline'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Spinner } from '../Spinner'
import { SearchOverlayCard } from './SearchOverlayCard'
import { useClickOutside } from '../../../utils/hooks'
import { mailman } from '../../../backend/utils/mailman'
import { SearchResultType } from '../../../types'
import { StyledSearchbar } from '.'
import { Button, Icon } from '..'

type Props = {
  placeholder?: string
  isSmall?: boolean
}

const Searchbar: FC<Props> = ({ placeholder, isSmall }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResultType[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => setIsFocused(false))

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
      }
      else {
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
        />
        <div className="searchBtn">
          <Button type="icon">
            <Icon size={20} fill="rgba(206, 206, 206, 0.6)">
              {loading ? <Spinner size={20} /> : <SearchIcon />}
            </Icon>
          </Button>
        </div>      
      </div>

      {isFocused && query && <SearchOverlayCard results={results}/> }
    </StyledSearchbar>
  )
}

export default Searchbar
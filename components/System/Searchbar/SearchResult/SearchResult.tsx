import Link from 'next/link'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Avatar, FlexGroup } from '@components/System'
import { SearchIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { SearchResultType } from '@types'

import { StyledSearchResult } from './'

type Props = {
  searchResult: SearchResultType
  hasNoResults?: boolean
  setIsFocused: (isFocused: boolean) => void
}

const SearchResult: FC<Props> = ({ searchResult, hasNoResults, setIsFocused }) => {
  const user = useSelector(selectUser)
  const type = searchResult.type || (!searchResult.avatar ? 'map' : 'user')

  const handleResultClick = async () => {
    const getBody = () => {
      switch (type) {
        case 'user':
          return { userId: user.id, type, searchedUserId: searchResult._id }
        case 'map':
          return { userId: user.id, type, searchedMapId: searchResult._id }
        case 'term':
          return { userId: user.id, type, term: searchResult.term }
        default:
          return {}
      }
    }

    await mailman('search/recent', 'POST', JSON.stringify(getBody()))

    setIsFocused(false)
  }

  return (
    <StyledSearchResult>
      {type === 'user' && (
        <Link href={`/user/${searchResult._id}`}>
          <a className="linkWrapper" onClick={() => handleResultClick()}>
            <FlexGroup gap={12}>
              <Avatar type="user" src={searchResult.avatar?.emoji} backgroundColor={searchResult.avatar?.color} />

              <span className="searchResultLabel">{searchResult.name}</span>
            </FlexGroup>
          </a>
        </Link>
      )}

      {type === 'map' && (
        <Link href={`/map/${searchResult._id}`}>
          <a className="linkWrapper" onClick={() => handleResultClick()}>
            <FlexGroup gap={12}>
              <Avatar type="map" src={searchResult.previewImg} />
              <span className="searchResultLabel">{searchResult.name}</span>
            </FlexGroup>
          </a>
        </Link>
      )}

      {type === 'term' && (
        <Link href={`/search?q=${searchResult.term}`}>
          <a className="linkWrapper" onClick={() => handleResultClick()}>
            <FlexGroup gap={12}>
              <div className="termAvatar">
                <SearchIcon height={18} color="#888" />
              </div>
              <span className="searchResultLabel">
                {hasNoResults ? `Search for ${searchResult.term}` : searchResult.term}
              </span>
            </FlexGroup>
          </a>
        </Link>
      )}
    </StyledSearchResult>
  )
}

export default SearchResult

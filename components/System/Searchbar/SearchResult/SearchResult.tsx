import Link from 'next/link'
import { FC } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Avatar, FlexGroup } from '@components/System'
import { SearchIcon } from '@heroicons/react/outline'
import { SearchResultType } from '@types'
import { StyledSearchResult } from './'

type Props = {
  searchResult: SearchResultType
  hasNoResults?: boolean
  setIsFocused: (isFocused: boolean) => void
}

const SearchResult: FC<Props> = ({ searchResult, hasNoResults, setIsFocused }) => {
  const type = searchResult.type || (!searchResult.avatar ? 'map' : 'user')

  const handleResultClick = async () => {
    const createRequestBody = () => {
      switch (type) {
        case 'user':
          return { type, searchedUserId: searchResult._id }
        case 'map':
          return { type, searchedMapId: searchResult._id }
        case 'term':
          return { type, term: searchResult.term }
        default:
          return {}
      }
    }

    await mailman('search/recent', 'POST', JSON.stringify(createRequestBody()))

    setIsFocused(false)
  }

  return (
    <StyledSearchResult>
      {type === 'user' && (
        <Link href={`/user/${searchResult._id}`}>
          <a className="linkWrapper" onClick={() => handleResultClick()}>
            <FlexGroup gap={12}>
              <Avatar type="user" src={searchResult.avatar?.emoji} backgroundColor={searchResult.avatar?.color} />
              <div className="searchResultLabelWrapper">
                <span className="searchResultLabel">{searchResult.name}</span>
              </div>
            </FlexGroup>
          </a>
        </Link>
      )}

      {type === 'map' && (
        <Link href={`/map/${searchResult._id}`}>
          <a className="linkWrapper" onClick={() => handleResultClick()}>
            <FlexGroup gap={12}>
              <Avatar type="map" src={searchResult.previewImg} />
              <div className="searchResultLabelWrapper">
                <span className="searchResultLabel">{searchResult.name}</span>
              </div>
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
              <div className="searchResultLabelWrapper">
                <span className="searchResultLabel">
                  {hasNoResults ? `Search for ${searchResult.term}` : searchResult.term}
                </span>
              </div>
            </FlexGroup>
          </a>
        </Link>
      )}
    </StyledSearchResult>
  )
}

export default SearchResult

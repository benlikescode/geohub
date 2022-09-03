import Link from 'next/link'
import React, { FC } from 'react'

import { Avatar, FlexGroup } from '@components/System'
import { SearchResultType } from '@types'

import { StyledSearchResult } from './'

type Props = {
  searchResult: SearchResultType
}

const SearchResult: FC<Props> = ({ searchResult }) => {
  const type = !searchResult.avatar ? 'map' : 'user'

  return (
    <StyledSearchResult>
      {type === 'user' && (
        <Link href={`/user/${searchResult._id}`}>
          <a className="linkWrapper">
            <FlexGroup>
              <Avatar
                url={`/images/avatars/${searchResult.avatar}.jpg` || ''}
                size={30}
                alt={`${searchResult.name}'s avatar`}
              />
              <span className="searchResultLabel">{searchResult.name}</span>
            </FlexGroup>
          </a>
        </Link>
      )}

      {type === 'map' && (
        <Link href={`/map/${searchResult.slug}`}>
          <a className="linkWrapper">
            <FlexGroup>
              <Avatar url={searchResult.previewImg || ''} size={30} alt={`${searchResult.name} map avatar`} />
              <span className="searchResultLabel">{searchResult.name}</span>
            </FlexGroup>
          </a>
        </Link>
      )}
    </StyledSearchResult>
  )
}

export default SearchResult

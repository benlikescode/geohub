import Link from 'next/link'
import React, { FC } from 'react'
import { StyledSearchResult } from '.'
import { Avatar, FlexGroup } from '../..'
import { SearchResultType } from '../../../../types'

type Props = {
  searchResult: SearchResultType
}

const SearchResult: FC<Props> = ({ searchResult }) => {
  return (
    <StyledSearchResult>
      <Link href={searchResult.link}>
        <a>
          <FlexGroup>
            <Avatar url={searchResult.avatar} size={30} alt=""/>
            <span className="searchResultLabel">{searchResult.label}</span>
          </FlexGroup>     
        </a> 
      </Link>   
    </StyledSearchResult>
  )
}

export default SearchResult

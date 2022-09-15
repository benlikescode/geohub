import Link from 'next/link'
import { FC } from 'react'

import { SearchResult } from '@components/System/Searchbar/SearchResult'
import { RecentSearchItem, SearchResultType } from '@types'

import { StyledSearchOverlayCard } from './'

type Props = {
  results: SearchResultType[]
  query: string
  setIsFocused: (isFocused: boolean) => void
}

const SearchOverlayCard: FC<Props> = ({ results, query, setIsFocused }) => {
  const noResultsItem: SearchResultType = {
    _id: 'no-results',
    name: 'no-results',
    type: 'term',
    term: query,
  }

  return (
    <StyledSearchOverlayCard>
      <div className="searchOverlayCard">
        <div className="searchOverlayBody">
          {results.map((result, idx) => (
            <SearchResult key={idx} searchResult={result} setIsFocused={setIsFocused} />
          ))}
          {query && results.length === 0 && (
            <SearchResult searchResult={noResultsItem} hasNoResults setIsFocused={setIsFocused} />
          )}
        </div>
        {query && results.length > 0 && (
          <Link href={`/search?q=${query}`}>
            <a>
              <div className="seeAllResults">
                <span>See all results</span>
              </div>
            </a>
          </Link>
        )}
      </div>
    </StyledSearchOverlayCard>
  )
}

export default SearchOverlayCard

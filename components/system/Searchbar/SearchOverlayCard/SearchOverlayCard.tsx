import Link from 'next/link'
import { FC } from 'react'
import { SearchResult, Skeleton } from '@components/system'
import { SearchResultType } from '@types'
import { StyledSearchOverlayCard } from './'

type Props = {
  results: SearchResultType[]
  query: string
  isLoading: boolean
  setIsFocused: (isFocused: boolean) => void
}

const SearchOverlayCard: FC<Props> = ({ results, query, isLoading, setIsFocused }) => {
  const noResultsItem: SearchResultType = {
    _id: 'no-results',
    name: 'no-results',
    type: 'term',
    term: query,
  }

  return (
    <StyledSearchOverlayCard>
      <div className="searchOverlayCard">
        {isLoading ? (
          <div className="searchOverlayBody">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="search-result-skeleton">
                <Skeleton variant="circular" height={34} width={34} />
                <Skeleton variant="rectangular" height={20} width={150} noBorder />
              </div>
            ))}
          </div>
        ) : (
          <div className="searchOverlayBody">
            {results.map((result, idx) => (
              <SearchResult key={idx} searchResult={result} setIsFocused={setIsFocused} />
            ))}
            {query && results.length === 0 && (
              <SearchResult searchResult={noResultsItem} hasNoResults setIsFocused={setIsFocused} />
            )}
          </div>
        )}

        {query && results.length > 0 && (
          <Link href={`/search?q=${query}`}>
            <a onClick={() => setIsFocused(false)}>
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

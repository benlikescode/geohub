import { FC } from 'react'

import { SearchResult } from '@components/System/Searchbar/SearchResult'
import { SearchResultType } from '@types'

import { StyledSearchOverlayCard } from './'

type Props = {
  results: SearchResultType[]
}

const SearchOverlayCard: FC<Props> = ({ results }) => {
  return (
    <StyledSearchOverlayCard>
      <div className="searchOverlayCard">
        <div className="searchOverlayBody">
          {results.map((result, idx) => (
            <SearchResult key={idx} searchResult={result} />
          ))}
        </div>
        <div className="seeAllResults">
          <span>See all results</span>
        </div>
      </div>
    </StyledSearchOverlayCard>
  )
}

export default SearchOverlayCard

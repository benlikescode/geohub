import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { StyledSearchOverlayCard } from '.'
import { SearchResultType } from '../../../../types'
import { SearchResult } from '../SearchResult'

type Props = {
  close: () => void
  results: SearchResultType[]
}

const SearchOverlayCard: FC<Props> = ({ close, results }) => {

  return ReactDOM.createPortal(
    <StyledSearchOverlayCard>
      <div className="layerContainer">
        <div className="searchOverlayCard">
          <div className="searchOverlayBody">
            {results.map((result, idx) => (
              <SearchResult key={idx} searchResult={result}/>
            ))}        
          </div>
          <div className="seeAllResults">
            <span>See all results</span>
          </div>
        </div>
        <div className="backdrop" onClick={() => close()} />
      </div>
    </StyledSearchOverlayCard>,
    document.getElementById('__next') as HTMLElement
  )
}

export default SearchOverlayCard

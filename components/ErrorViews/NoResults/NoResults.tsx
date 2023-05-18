import Image from 'next/image'
import { FC } from 'react'
import { StyledNoResults } from './'

type Props = {
  message?: string
}

const NoResults: FC<Props> = ({ message }) => {
  return (
    <StyledNoResults>
      <div className="no-results-container">
        <Image src="/images/noResults.png" height={250} width={250} alt="computer with no search results" />

        <h2>No results found</h2>
        <h3>{message || `We couldn't find what you're looking for.`}</h3>
      </div>
    </StyledNoResults>
  )
}

export default NoResults

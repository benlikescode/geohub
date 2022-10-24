import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { Avatar } from '@components/System'
import { Skeleton } from '@components/System/Skeleton'
import StyledSearchPage from '@styles/SearchPage.Styled'

const SearchResultsPage: NextPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { q } = router.query

  useEffect(() => {
    if (typeof q !== 'string') return

    getSearchResults(q)
  }, [q])

  const getSearchResults = async (query: string) => {
    const { res } = await mailman(`search?q=${query}&count=10`)
    setSearchResults(res)
    setLoading(false)
  }

  return (
    <StyledSearchPage>
      <WidthController>
        <Head title={`Search Results - ${q}`} />
        <PageHeader>Search Results</PageHeader>

        <div style={{ width: 'fit-content' }}>
          {loading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="search-result">
                <Skeleton variant="circular" height={40} width={40} />
                <Skeleton height={16} width={80} noBorder />
              </div>
            ))}

          {!loading && searchResults.length === 0 && (
            <h2 className="no-search-results">
              No results found for <span>{q}</span>
            </h2>
          )}

          {!loading && searchResults.length > 0 && (
            <h2 className="num-search-results">
              {`Showing ${searchResults.length} result${searchResults.length > 1 ? 's' : ''} for ${q}`}
            </h2>
          )}

          {searchResults.map((result, idx) => {
            if (result.avatar) {
              return (
                <Link key={idx} href={`/user/${result._id}`}>
                  <a className="search-result">
                    <div className="user-avatar">
                      <Avatar type="user" src={result.avatar?.emoji} backgroundColor={result.avatar?.color} size={40} />
                    </div>
                    <div className="user-name">
                      <span>{result.name}</span>
                    </div>
                  </a>
                </Link>
              )
            } else {
              return (
                <Link key={idx} href={`/map/${result._id}`}>
                  <a className="search-result">
                    <div className="user-avatar">
                      <Avatar type="map" src={result.previewImg} size={40} />
                    </div>
                    <div className="user-name">
                      <span>{result.name}</span>
                    </div>
                  </a>
                </Link>
              )
            }
          })}
        </div>
      </WidthController>
    </StyledSearchPage>
  )
}

export default SearchResultsPage

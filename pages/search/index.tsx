import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mailman } from '@backend/utils/mailman'
import { Layout } from '@components/Layout'
import { selectUser } from '@redux/user'
import { Head } from '@components/Head'
import { useRouter } from 'next/router'
import StyledSearchPage from '@styles/SearchPage.Styled'
import { Skeleton } from '@components/System/Skeleton'
import Link from 'next/link'
import { Avatar } from '@components/System'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

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
      <Layout>
        <Head title={`Search Results - ${q}`} />
        <StyledHeader>Search Results</StyledHeader>

        <div style={{ width: 'fit-content' }}>
          {loading &&
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="search-result">
                <Skeleton variant="circular" height={40} width={40} />
                <Skeleton height={16} width={80} noBorder />
              </div>
            ))}

          {!loading && searchResults.length === 0 && <span>{`No results found for ${q}`}</span>}

          {searchResults.map((result, idx) => (
            <Link key={idx} href={`/user/${result._id}`}>
              <a className="search-result">
                <div className="user-avatar">
                  <Avatar url={`/images/avatars/${result.avatar}.jpg`} size={40} />
                </div>
                <div className="user-name">
                  <span>{result.name}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Layout>
    </StyledSearchPage>
  )
}

export default SearchResultsPage

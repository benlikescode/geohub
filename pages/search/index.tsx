import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { WidthController } from '@components/Layout/WidthController'
import { Avatar } from '@components/System'
import { Skeleton } from '@components/System/Skeleton'
import { Tab, Tabs } from '@components/System/Tabs'
import StyledSearchPage from '@styles/SearchPage.Styled'
import { MapType, UserType } from '@types'

type SearchResults = {
  users: UserType[]
  maps: MapType[]
}

const SearchResultsPage: NextPage = () => {
  const [allSearchResults, setAllSearchResults] = useState<any[]>([])
  const [userSearchResults, setUserSearchResults] = useState<UserType[]>([])
  const [mapSearchResults, setMapSearchResults] = useState<MapType[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'maps' | 'users'>('all')

  const router = useRouter()
  const { q } = router.query

  useEffect(() => {
    if (typeof q !== 'string' || !q) return

    getSearchResults(q)
  }, [q])

  const getSearchResults = async (query: string) => {
    setLoading(true)

    const res: SearchResults = await mailman(`search?q=${query}&count=10`)

    setAllSearchResults([...res.users, ...res.maps])
    setUserSearchResults(res.users)
    setMapSearchResults(res.maps)

    setLoading(false)
  }

  const renderSearchResults = () => {
    if (selectedFilter === 'all') {
      if (allSearchResults.length === 0) {
        return (
          <h3 className="no-search-results">
            No results found for <span>{q}</span>
          </h3>
        )
      }

      return allSearchResults.map((result, idx) =>
        result.avatar ? <UserResultJSX key={idx} result={result} /> : <MapResultJSX key={idx} result={result} />
      )
    }

    if (selectedFilter === 'users') {
      if (userSearchResults.length === 0) {
        return (
          <h3 className="no-search-results">
            No user results found for <span>{q}</span>
          </h3>
        )
      }

      return userSearchResults.map((result, idx) => <UserResultJSX key={idx} result={result} />)
    }

    if (selectedFilter === 'maps') {
      if (mapSearchResults.length === 0) {
        return (
          <h3 className="no-search-results">
            No map results found for <span>{q}</span>
          </h3>
        )
      }

      return mapSearchResults.map((result, idx) => <MapResultJSX key={idx} result={result} />)
    }
  }

  return (
    <StyledSearchPage>
      <WidthController customWidth="800px">
        <Head title={`Search Results - ${q}`} />

        <div className="tabs-wrapper">
          <h1 className="page-title">Search Results</h1>

          <Tabs>
            <Tab isActive={selectedFilter === 'all'} onClick={() => setSelectedFilter('all')}>
              <div className="filter-tab">
                <span>All</span>
                <div className="result-count-bubble">{allSearchResults.length}</div>
              </div>
            </Tab>

            <Tab isActive={selectedFilter === 'users'} onClick={() => setSelectedFilter('users')}>
              <div className="filter-tab">
                <span>Users</span>
                <div className="result-count-bubble">{userSearchResults.length}</div>
              </div>
            </Tab>

            <Tab isActive={selectedFilter === 'maps'} onClick={() => setSelectedFilter('maps')}>
              <div className="filter-tab">
                <span>Maps</span>
                <div className="result-count-bubble">{mapSearchResults.length}</div>
              </div>
            </Tab>
          </Tabs>
        </div>

        <div className="search-results-wrapper">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="search-result">
                  <Skeleton variant="circular" height={40} width={40} />
                  <Skeleton height={16} width={80} noBorder />
                </div>
              ))
            : renderSearchResults()}
        </div>
      </WidthController>
    </StyledSearchPage>
  )
}

const UserResultJSX: FC<{ result: any }> = ({ result }) => {
  return (
    <Link href={`/user/${result._id}`}>
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
}

const MapResultJSX: FC<{ result: any }> = ({ result }) => {
  return (
    <Link href={`/map/${result._id}`}>
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

export default SearchResultsPage

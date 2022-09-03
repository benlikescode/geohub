import type { NextPage } from 'next'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Layout } from '@components/Layout'
import { StyledAnalytics } from '@components/Admin/Analytics/Analytics.Styled'
import { mailman } from '@backend/utils/mailman'
import { useSelector } from 'react-redux'
import { selectUser } from '@redux/user'
import { Skeleton } from '@components/System/Skeleton'
import { UserType } from '@types'
import { CountItem } from '@components/Admin/Analytics/CountItem'
import { ListItem } from '@components/Admin/Analytics/ListItem'
import { NotAuthenticated } from '@components/ErrorViews/NotAuthenticated'
import { Head } from '@components/Head'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

type AnalyticsType = {
  counts: [{ title: string; count: number }]
  recentUsers: UserType[]
}

const AnalyticsPage: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsType>()
  const user = useSelector(selectUser)

  const loadAnalytics = async () => {
    setLoading(true)

    const {
      status,
      res: { data },
    } = await mailman('analytics', 'GET')

    setAnalytics(data)

    setLoading(false)
  }

  useEffect(() => {
    // HALP - add server side validation for isAdmiin
    loadAnalytics()
  }, [])

  return (
    <Layout>
      <Head title="Admin - Analytics" />
      <StyledHeader>Analytics</StyledHeader>

      <StyledAnalytics>
        <div className="analytics-group ">
          {loading && Array.from({ length: 4 }).map((_, idx) => <Skeleton key={idx} />)}
          {!loading &&
            analytics?.counts.map((countItem, idx) => (
              <CountItem key={idx} title={countItem.title} count={countItem.count} />
            ))}
        </div>

        <div className="analytics-group ">
          {loading &&
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="skeleton-group-item">
                <div className="skeleton-heading">
                  <Skeleton variant="rectangular" height={16} width={200} />
                </div>
                <div className="skeleton-data">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div className="skeleton-user-item" key={idx}>
                      <div className="skeleton-user-details">
                        <Skeleton variant="circular" height={30} width={30} />
                        <Skeleton variant="rectangular" height={16} width={100} />
                      </div>
                      <div className="skeleton-user-created-date">
                        <Skeleton variant="rectangular" height={16} width={200} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {!loading && (
            <>
              <ListItem title="New Users" data={analytics?.recentUsers as UserType[]} />
              <ListItem title="New Users" data={analytics?.recentUsers as UserType[]} />
            </>
          )}
        </div>
      </StyledAnalytics>
    </Layout>
  )
}

export default AnalyticsPage

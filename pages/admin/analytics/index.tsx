import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import { mailman } from '@backend/utils/mailman'
import { StyledAnalytics } from '@components/Admin/Analytics/Analytics.Styled'
import { CountItem } from '@components/Admin/Analytics/CountItem'
import { ListItem } from '@components/Admin/Analytics/ListItem'
import { Head } from '@components/Head'
import { PageHeader } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { Skeleton } from '@components/System/Skeleton'
import { GameType, UserType } from '@types'
import { showErrorToast } from '@utils/helpers/showToasts'

type AnalyticsType = {
  counts: [{ title: string; count: number }]
  recentUsers: UserType[]
  recentGames: GameType[]
}

const AnalyticsPage: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsType>()

  const loadAnalytics = async () => {
    setLoading(true)

    const res = await mailman('analytics', 'GET')

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setAnalytics(res.data)

    setLoading(false)
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  return (
    <WidthController>
      <Head title="Admin - Analytics" />
      <PageHeader>Analytics</PageHeader>

      <StyledAnalytics>
        <div className="analytics-group ">
          {loading && Array.from({ length: 4 }).map((_, idx) => <Skeleton key={idx} height={118} />)}
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
                  {Array.from({ length: 7 }).map((_, idx) => (
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
              <ListItem title="Recent Games" data={analytics?.recentGames as GameType[]} />
            </>
          )}
        </div>
      </StyledAnalytics>
    </WidthController>
  )
}

export default AnalyticsPage

import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { StyledAnalytics } from '@components/Admin/Analytics/Analytics.Styled'
import { CountItem } from '@components/Admin/Analytics/CountItem'
import { ListItem } from '@components/Admin/Analytics/ListItem'
import { Head } from '@components/Head'
import { PageHeader, WidthController } from '@components/layout'
import { Skeleton } from '@components/system'
import { AnalyticsType } from '@types'
import { mailman, showToast } from '@utils/helpers'

const AnalyticsPage: NextPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsType>()

  const loadAnalytics = async () => {
    const res = await mailman('analytics', 'GET')

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setAnalytics(res.data)
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  return (
    <StyledAnalytics>
      <WidthController>
        <Head title="Admin - Analytics" />
        <PageHeader>Analytics</PageHeader>

        <div className="analytics-grid">
          <div className="analytics-stats ">
            {!analytics
              ? Array.from({ length: 8 }).map((_, idx) => <Skeleton key={idx} height={118} />)
              : analytics?.counts.map((countItem, idx) => (
                  <CountItem key={idx} title={countItem.title} count={countItem.count} />
                ))}
          </div>

          <div className="analytics-lists ">
            {!analytics ? (
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
              ))
            ) : (
              <>
                <ListItem title="New Users" data={analytics} />
                <ListItem title="Recent Games" data={analytics} />
                <ListItem title="New Users By Day" data={analytics} />
                <ListItem title="Games Played By Day" data={analytics} />
              </>
            )}
          </div>
        </div>
      </WidthController>
    </StyledAnalytics>
  )
}

export default AnalyticsPage

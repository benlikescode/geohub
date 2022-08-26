import type { NextPage } from 'next'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Layout } from '../../../components/Layout'
import { StyledAnalytics } from '../../../components/Admin/Analytics/Analytics.Styled'
import { mailman } from '../../../backend/utils/mailman'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

type AnalyticsType = {
  users: number,
  spGames: number,
  challenges: number,
  aerialGames: number,
}

const AnalyticsPage: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsType>()

  const loadAnalytics = async () => {
    setLoading(true)

    const { status, res: { data } } = await mailman('analytics', 'GET')

    setAnalytics(data)

    setLoading(false)
  }

  useEffect(() => {
    loadAnalytics()
  }, [])
  
  return (
    <Layout>
      <StyledHeader>Analytics</StyledHeader>

      <StyledAnalytics>
        {loading && (
          <span>Loading...</span>
        )}
        {!loading && (
          <div className="analytics-group">
            <div className="analytics-group-item">
              <div className="analytics-heading">
                <span className="analytics-heading-title">USERS</span>
              </div>
              <div className="analytics-data">
                <span className="analytics-amount">{analytics?.users}</span>
              </div>
            </div>
            <div className="analytics-group-item">
              <div className="analytics-heading">
                <span className="analytics-heading-title">SINGLE PLAYER GAMES</span>
              </div>
              <div className="analytics-data">
                <span className="analytics-amount">{analytics?.spGames}</span>
              </div>
            </div>
            <div className="analytics-group-item">
              <div className="analytics-heading">
                <span className="analytics-heading-title">CHALLENGES</span>
              </div>
              <div className="analytics-data">
                <span className="analytics-amount">{analytics?.challenges}</span>
              </div>
            </div>
            <div className="analytics-group-item">
              <div className="analytics-heading">
                <span className="analytics-heading-title">AERIAL GAMES</span>
              </div>
              <div className="analytics-data">
                <span className="analytics-amount">{analytics?.aerialGames}</span>
              </div>
            </div>
          </div>
        )}
      </StyledAnalytics>
    </Layout>
  )
}

export default AnalyticsPage

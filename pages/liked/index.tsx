import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, LoadingPage } from '@components/Layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { SkeletonCards } from '@components/SkeletonCards'
import { BlockQuote } from '@components/System/BlockQuote'
import { selectUser } from '@redux/user'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

const StyledMapWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;

  @media (max-width: 1350px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const LikedPage: NextPage = () => {
  const [likedMaps, setLikedMaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user.id) {
      return setLoading(false)
    }

    const fetchLikedMaps = async () => {
      const { res } = await mailman(`likes?userId=${user.id}`)
      setLikedMaps(res)
      setLoading(false)
    }

    fetchLikedMaps()
  }, [user.id])

  return (
    <Layout>
      <Head title="Liked Maps" />
      <StyledHeader>Liked Maps</StyledHeader>

      {loading && <SkeletonCards numCards={8} />}

      {/*(!user.id || !likedMaps || likedMaps.length === 0) && (
        <BlockQuote>You do not appear to have any liked maps</BlockQuote>
      )*/}

      {likedMaps.length > 0 && (
        <StyledMapWrapper>
          {likedMaps.map((map, idx) => (
            <MapPreviewCard key={idx} map={map.mapDetails[0]} />
          ))}
        </StyledMapWrapper>
      )}
    </Layout>
  )
}

export default LikedPage

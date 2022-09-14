import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { NoResults } from '@components/ErrorViews/NoResults'

import { Head } from '../../components/Head'
import { Layout } from '../../components/Layout'
import { AvatarPickerModal } from '../../components/Modals/AvatarPickerModal'
import { Modal } from '../../components/Modals/Modal'
import { SearchPopup } from '../../components/SearchPopup'
import { SkeletonCards } from '../../components/SkeletonCards'
import { SkeletonLeaderboard } from '../../components/SkeletonLeaderboard'
import { SkeletonMapInfo } from '../../components/SkeletonMapInfo'
import { removeDuplicateLocations } from '../../utils/helperFunctions'
import diverseWorld from '../../utils/locations/diverseWorld.json'

import type { NextPage } from 'next'
const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

const StyledMessage = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color3);
`

const MyMapsPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    console.log(removeDuplicateLocations(diverseWorld))
  }, [])

  return (
    <Layout>
      <Head title="My Maps" />
      <StyledHeader>Coming Soon!</StyledHeader>

      <div style={{ height: 'calc(100vh - 400px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NoResults message="Like a map for it to show here" />
      </div>
    </Layout>
  )
}

export default MyMapsPage

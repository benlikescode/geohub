import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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

      <button onClick={() => setModalOpen(true)}>Change Avatar</button>

      {modalOpen && <AvatarPickerModal closeModal={() => setModalOpen(false)} />}

      <img src="😎" alt="cool" />
      <div style={{ height: '40px', width: '40px' }}>😎</div>
      <span>😢</span>
      <span style={{ fontSize: '4rem', width: '100%', textAlign: 'center' }}>😠</span>
      {/*<div>
        <img
          src="https://ouch-cdn2.icons8.com/7ouKWLmWN1-WhDpK28kH-TnrGhfKQEz3GZvo7zr7VsM/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzY4/LzFkYjE2MmU4LTM5/NDQtNDhhMS04ZGJh/LTc0ZDc1MGYxN2E2/Yy5zdmc.png"
          alt=""
        />
        <StyledMessage>You do not appear to have any liked maps</StyledMessage>
        <span>Like a map for it to show here</span>
      </div>*/}
    </Layout>
  )
}

export default MyMapsPage

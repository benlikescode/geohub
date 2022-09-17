import { FC, useEffect, useState } from 'react'

import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { SkeletonCards } from '@components/SkeletonCards'
import { StreetviewLayerMap } from '@components/StreetviewLayerMap'
import user from '@redux/user'
import StyledCreateMapPage from '@styles/CreateMapPage.Styled'

const CreateMapPage: FC = () => {
  return (
    <StyledCreateMapPage>
      <Layout>
        <Head title="Create A Map" />
        <PageHeader>Create A Map</PageHeader>

        <StreetviewLayerMap />
      </Layout>
    </StyledCreateMapPage>
  )
}

export default CreateMapPage

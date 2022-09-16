import GoogleMapReact from 'google-map-react'
import React from 'react'

import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { Marker } from '@components/Marker'

import type { NextPage } from 'next'
const MyMapsPage: NextPage = () => {
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  return (
    <Layout>
      <Head title="My Maps" />
      <PageHeader>Coming Soon!</PageHeader>
    </Layout>
  )
}

export default MyMapsPage

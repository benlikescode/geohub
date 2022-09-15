import type { NextPage } from 'next'
import React from 'react'

import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { BlockQuote } from '@components/System'

const FriendsPage: NextPage = () => {
  return (
    <Layout>
      <Head title="Friends" />
      <PageHeader>Friends</PageHeader>

      <NoResults message="Add friends for them to show here" />
    </Layout>
  )
}

export default FriendsPage

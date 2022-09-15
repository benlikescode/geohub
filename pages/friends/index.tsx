import type { NextPage } from 'next'
import React from 'react'

import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { BlockQuote } from '@components/System'

const FriendsPage: NextPage = () => {
  return (
    <Layout>
      <Head title="Friends" />
      <PageHeader>Friends</PageHeader>

      <BlockQuote>You do not appear to have any friends</BlockQuote>
    </Layout>
  )
}

export default FriendsPage

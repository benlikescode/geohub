import type { NextPage } from 'next'
import React from 'react'

import { NoResults } from '@components/ErrorViews/NoResults'
import { NotFound } from '@components/ErrorViews/NotFound'
import { Head } from '@components/Head'
import { Layout } from '@components/Layout'

const Custom404: NextPage = () => {
  return (
    <Layout>
      <Head title="Page Not Found" />

      <NotFound />
    </Layout>
  )
}

export default Custom404

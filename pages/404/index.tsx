import type { NextPage } from 'next'
import React from 'react'

import { NoResults } from '@components/ErrorViews/NoResults'
import { NotFound } from '@components/ErrorViews/NotFound'
import { Head } from '@components/Head'
import { Layout } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'

const Custom404: NextPage = () => {
  return (
    <WidthController>
      <Head title="Page Not Found" />

      <NotFound />
    </WidthController>
  )
}

export default Custom404

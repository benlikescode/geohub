import type { NextPage } from 'next'
import React from 'react'
import { Layout } from '@components/Layout'
import { Navbar } from '@components/Layout/Navbar'

const ClansPage: NextPage = () => {
  return (
    <Layout>
      <section>
        <Navbar />

        <main>
          <h1>Coming Soon!</h1>
        </main>
      </section>
    </Layout>
  )
}

export default ClansPage

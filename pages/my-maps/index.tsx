import type { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import { Head } from '../../components/Head'
import { Layout } from '../../components/Layout'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

const MyMapsPage: NextPage = () => {
  return (
    <Layout>
      <Head title="My Maps" />
      <StyledHeader>Coming Soon!</StyledHeader>
    </Layout>
  )
}

export default MyMapsPage

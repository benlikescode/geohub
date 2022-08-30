import type { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import { Head } from '../../components/Head'
import { Layout } from '../../components/Layout'
import { BlockQuote } from '../../components/System'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

const FriendsPage: NextPage = () => {
  return (
    <Layout>
      <Head title="Friends" />
      <StyledHeader>Friends</StyledHeader>

      <BlockQuote>You do not appear to have any friends</BlockQuote>
    </Layout>
  )
}

export default FriendsPage

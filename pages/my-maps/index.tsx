import type { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import { Layout } from '../../components/Layout'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

const MyMapsPage: NextPage = () => {
  return (
    <Layout>
      <StyledHeader>Coming Soon!</StyledHeader>
    </Layout>
  )
}

export default MyMapsPage

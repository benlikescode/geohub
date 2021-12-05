import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mailman } from '../../backend/utils/mailman';
import { MapPreviewCard } from '../../components/Home/MapPreviewCard';
import { Layout } from '../../components/Layout'
import { Navbar } from '../../components/Layout/Navbar'
import { Spinner } from '../../components/System/Spinner';
import { selectUser } from '../../redux/user';

const StyledMapWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  margin-top: 2rem;

  @media (max-width: 1350px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const StyledSpinnerWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
`

const LikedPage: NextPage = () => { 
  const [likedMaps, setLikedMaps] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(selectUser)
  
  useEffect(() => {
    if (!user.id) {
      return
    }

    setLoading(true)

    const fetchLikedMaps = async () => {
      const { res } = await mailman(`likes?userId=${user.id}`)
      setLikedMaps(res)
      setLoading(false)
    }

    fetchLikedMaps()
  }, [user])


  return (
    <Layout>
      <section>
        <Navbar />

        <main>
          <h1>Liked Maps</h1>
      
          {loading ? (
            <StyledSpinnerWrapper>
              <Spinner />
            </StyledSpinnerWrapper>        
          ) : 
          (
            <StyledMapWrapper>
              {likedMaps.map((map, idx) => (
                <MapPreviewCard key={idx} map={map.mapDetails[0]} />
              ))}
            </StyledMapWrapper>
          )}       
        </main>   
      </section>
    </Layout>
  )
}

export default LikedPage

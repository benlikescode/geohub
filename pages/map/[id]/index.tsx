import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Navbar, Layout, Sidebar } from '../../../components/Layout'
import { GameSettings } from '../../../components/GameSettings'

const MapPage: NextPage = () => {

  return (
    <>
      <Navbar />
      <Layout hasSidebar>
        <div>
          <Sidebar />
        </div>

        <main>
          <GameSettings />
        </main>
       
       
      </Layout>
    
     
    </>
  )
}

export default MapPage

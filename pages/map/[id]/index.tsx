import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Navbar, Layout, Sidebar } from '../../../components/Layout'

const MapPage: NextPage = () => {

  return (
    <>
      <Navbar />
      <Layout hasSidebar>
        <div>
          <Sidebar />
        </div>

        <main>
          <span>Cool Map, Let's Go!</span>
        </main>
       
       
      </Layout>
    
     
    </>
  )
}

export default MapPage

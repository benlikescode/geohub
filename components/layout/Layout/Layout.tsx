import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
import { MobileNav, Navbar, Sidebar } from '@components/layout'
import { StyledLayout } from './'
import { mailman } from '@utils/helpers'
import { BanType } from '@types'
import { SUPPORT_EMAIL } from '@utils/constants/random'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const [banMessage, setBanMessage] = useState('')
  const { asPath } = useRouter()

  useEffect(() => {
    document.getElementById('main')?.scrollTo({ top: 0 })
  }, [asPath])

  useEffect(() => {
    fetchUserStatus()
  }, [])

  const fetchUserStatus = async () => {
    const userBan = await mailman('users/status')

    if (!userBan?.isBanned) {
      return
    }

    const details = userBan.details as BanType

    if (!details) {
      return setBanMessage('You are currently banned from playing games')
    }

    const reason = details.reason ? ` for ${details.reason}` : ''
    const message = `You have received a ${details.duration} ban${reason}.`

    setBanMessage(message)
  }

  return (
    <StyledLayout>
      <div className="app-layout">
        <Navbar />

        <div className="appBody">
          <Sidebar />

          <main id="main">{children}</main>
        </div>

        <MobileNav />

        <div className="banner-message">
          <p>
            We are growing! There will be up to 10 minutes of downtime while we increase our server size. Sorry for the
            inconvenience.
          </p>
        </div>

        {banMessage && (
          <div className="ban-message">
            {banMessage}
            <p>{`If you believe this is a mistake, email ${SUPPORT_EMAIL}.`}</p>
          </div>
        )}
      </div>
    </StyledLayout>
  )
}

export default Layout

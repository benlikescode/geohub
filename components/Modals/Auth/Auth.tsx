import Link from 'next/link'
import React, { FC } from 'react'

import { Button, Icon } from '@components/System'
import { XIcon } from '@heroicons/react/outline'

import { StyledAuth } from './'

type Props = {
  closeModal: () => void
}

const Auth: FC<Props> = ({ closeModal }) => {
  return (
    <StyledAuth>
      <div className="header">
        <h2>Log In To GeoHub</h2>
        <Button type="icon" callback={() => closeModal()} className="closeBtn">
          <Icon size={30} hoverColor="var(--color2)">
            <XIcon />
          </Icon>
        </Button>
      </div>

      <div className="mainContent">
        <div className="buttonsWrapper">
          <Link href="/login">
            <a>
              <Button type="solidCustom" backgroundColor="#3d3d3d" color="#fff" hoverColor="#444" width="100%">
                Login
              </Button>
            </a>
          </Link>

          <Link href="/register">
            <a>
              <Button type="solidPurple" width="100%">
                Sign Up
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </StyledAuth>
  )
}

export default Auth

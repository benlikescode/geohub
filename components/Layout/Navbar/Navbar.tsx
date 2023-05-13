import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { Avatar, Button, Icon, Searchbar } from '@components/System'
import { SearchIcon } from '@heroicons/react/outline'
import { StyledNavbar } from './'

const Navbar: FC = () => {
  const { data: session } = useSession()
  const [searchOpen, setSearchOpen] = useState(false)
  console.log(session)
  return (
    <StyledNavbar>
      {searchOpen && (
        <>
          <Searchbar autoFocus onClickOutside={() => setSearchOpen(false)} />
          <span className="cancelSearch" onClick={() => setSearchOpen(false)}>
            Cancel
          </span>
        </>
      )}

      {!searchOpen && (
        <>
          <div className="leftContainer">
            <Link href="/">
              <a>
                <h2 className="appTitle">GeoHub</h2>
              </a>
            </Link>
          </div>

          <div className="middleContainer">
            <Searchbar />
          </div>

          <div className="rightContainer">
            <div className="rightWrapper">
              <Button variant="icon" className="mobileSearch" onClick={() => setSearchOpen(true)}>
                <Icon size={20} fill="#efeff1">
                  <SearchIcon />
                </Icon>
              </Button>

              {session ? (
                <Link href={`/user/${session.user.id}`}>
                  <a className="userInfo">
                    <span className="username">{session.user.name}</span>
                    <Avatar type="user" src={session.user.avatar.emoji} backgroundColor={session.user.avatar.color} />
                  </a>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <a>
                      <Button variant="solidCustom" size="sm" backgroundColor="#3d3d3d" color="#fff" hoverColor="#444">
                        Login
                      </Button>
                    </a>
                  </Link>

                  <Link href="/register">
                    <a>
                      <Button size="sm">Sign Up</Button>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </StyledNavbar>
  )
}

export default Navbar

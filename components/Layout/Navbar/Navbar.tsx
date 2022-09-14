import Link from 'next/link'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Button, Icon, Searchbar } from '@components/System'
import { SearchIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { UserType } from '@types'

import { StyledNavbar } from './'

const Navbar: FC = () => {
  const user: UserType = useSelector(selectUser)
  const [searchOpen, setSearchOpen] = useState(false)

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

            <div className="navLinks">
              <Link href="/liked">
                <a>
                  <h2 className="navLink">Liked Maps</h2>
                </a>
              </Link>

              <Link href="/ongoing">
                <a>
                  <h2 className="navLink">Ongoing Games</h2>
                </a>
              </Link>
              <Link href="/friends">
                <a>
                  <h2 className="navLink">Friends</h2>
                </a>
              </Link>
            </div>
          </div>

          <div className="middleContainer">
            <Searchbar />
          </div>

          <div className="rightContainer">
            <div className="rightWrapper">
              <Button type="icon" className="mobileSearch" callback={() => setSearchOpen(true)}>
                <Icon size={20} fill="#efeff1">
                  <SearchIcon />
                </Icon>
              </Button>

              {user.id && (
                <Link href={`/user/${user.id}`}>
                  <a className="userInfo">
                    <span className="username">{user.name}</span>
                    <Avatar type="user" src={user.avatar?.emoji} backgroundColor={user.avatar?.color} />
                  </a>
                </Link>
              )}

              {!user.id && (
                <>
                  <Link href="/login">
                    <a>
                      <Button type="solidCustom" backgroundColor="#3d3d3d" color="#fff" hoverColor="#444" isSmall>
                        Login
                      </Button>
                    </a>
                  </Link>

                  <Link href="/register">
                    <a>
                      <Button type="solidPurple" isSmall>
                        Sign Up
                      </Button>
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

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Avatar, Button, Searchbar } from '@components/System'
import { SearchIcon } from '@heroicons/react/outline'
import { useAppSelector } from '../../../redux-utils'
import { AppLogo } from '../../AppLogo'
import { StyledNavbar } from './'

const Navbar: FC = () => {
  const { data: session } = useSession()
  const user = useAppSelector((state) => state.user)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <StyledNavbar>
      {searchOpen && (
        <>
          <Searchbar autoFocus onClickOutside={() => setSearchOpen(false)} />
          <span className="cancel-search" onClick={() => setSearchOpen(false)}>
            Cancel
          </span>
        </>
      )}

      {!searchOpen && (
        <>
          <div className="left-container">
            <AppLogo />
          </div>

          <div className="middle-container">
            <Searchbar />
          </div>

          <div className="right-container">
            <div className="right-wrapper">
              <button className="mobile-search" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </button>

              {session ? (
                <Link href={`/user/${user.id}`}>
                  <a className="user-info">
                    <span className="username">{user.name}</span>
                    <Avatar type="user" src={user.avatar.emoji} backgroundColor={user.avatar.color} />
                  </a>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <a>
                      <Button variant="solidCustom" size="md" backgroundColor="#3d3d3d" color="#fff" hoverColor="#444">
                        Log In
                      </Button>
                    </a>
                  </Link>

                  <Link href="/register">
                    <a>
                      <Button size="md">Sign Up</Button>
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

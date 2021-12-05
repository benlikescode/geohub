import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledNavbar } from '.'
import { selectUser } from '../../../redux/user'
import { UserType } from '../../../types'
import { Avatar, Button, Searchbar } from '../../System'

type Props = {
  isHomePage?: boolean
}

const Navbar: FC<Props> = ({ isHomePage }) => {
  const [atTop, setAtTop] = useState(true)
  const user: UserType = useSelector(selectUser)

  const handleScroll = () => {
    setAtTop(window.scrollY < 76)
  }

  useEffect(() => {
    if (!isHomePage) {
      return
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <StyledNavbar atTop={isHomePage && atTop}>
      <div className="mainSection">
        <Searchbar />

        {user.id ?
          <div className="rightWrapper">             
              <Link href={`/user/${user.id}`}>
                <a className="userInfo">
                  <span className="username">{user.name}</span>
                  <Avatar url={`/images/avatars/${user.avatar}.jpg`} alt="" size={40} customOutline="1px solid rgba(255, 255, 255, 0.55)" />
                </a>                      
              </Link>
          </div>

          :
    
          <div className="rightWrapper">
            <Link href="/login">
              <a>
                <Button type="ghost" width="120px">Login</Button>
              </a>
            </Link>

            <Link href="/register">
              <a>
                <Button type="solidPurple" width="120px">Sign Up</Button>
              </a>
            </Link>  
          </div>
                  
        }            
      </div>
    </StyledNavbar>
  )
}

export default Navbar

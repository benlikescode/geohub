import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledNavbar2 } from '.'
import { selectUser } from '../../../redux/user'
import { UserType } from '../../../types'
import { Searchbar2 } from '../../Searchbar2'
import { Avatar, Button } from '../../System'

type Props = {
  isHomePage?: boolean
}

const Navbar2: FC<Props> = ({ isHomePage }) => {
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
    <StyledNavbar2 atTop={isHomePage && atTop}>
      <div className="mainSection">
        <Searchbar2 />

        {user.id ?
          <div className="rightWrapper">             
              <Link href={`/user/${user.id}`}>
                <a className="userInfo">
                  <span className="username">{user.name}</span>
                  <Avatar url={user.avatar} alt="" size={40}/>
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
    </StyledNavbar2>
  )
}

export default Navbar2

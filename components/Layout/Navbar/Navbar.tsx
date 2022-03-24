import { SearchIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledNavbar } from '.'
import { selectUser } from '../../../redux/user'
import { UserType } from '../../../types'
import { Avatar, Button, Icon, Searchbar } from '../../System'

type Props = {
  isHomePage?: boolean
}

const Navbar: FC<Props> = ({ isHomePage }) => {
  const user: UserType = useSelector(selectUser)

  return (
    <StyledNavbar>
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
          <Button type="icon" className="mobileSearch">
            <Icon size={20} fill="#606060">
              <SearchIcon />     
            </Icon>
          </Button>
         

          {user.id && (        
            <Link href={`/user/${user.id}`}>
              <a className="userInfo">
                <span className="username">{user.name}</span>
                <Avatar url={`/images/avatars/${user.avatar}.jpg`} alt="" size={30} customOutline="1px solid rgba(255, 255, 255, 0.15)" />
              </a>                      
            </Link>    
          )}

          {!user.id && (
            <>
              <Link href="/login">
                <a>
                  <Button 
                    type="solidCustom" 
                    backgroundColor='#3d3d3d' 
                    color='#fff' 
                    hoverColor='#444' 
                    isSmall
                  >
                    Login
                  </Button>
                </a>
              </Link>

              <Link href="/register">
                <a>
                  <Button type="solidPurple" isSmall>Sign Up</Button>
                </a>
              </Link>  
            </>
          )} 
        </div>           
      </div>   
    </StyledNavbar>
  )
}

export default Navbar

import { DesktopComputerIcon, HeartIcon, HomeIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledNavbar } from '.'
import { selectUser } from '../../../redux/user'
import { UserType } from '../../../types'
import { Avatar, Button, Icon, Searchbar } from '../../System'
import NavLink from './NavLink'

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
            <div className="logoWrapper">
              <div className="logo">
                <Icon size={24} fill="#fff">
                  <LocationMarkerIcon />
                </Icon>
              </div>
              <h2 className="appTitle">GeoHub</h2>
            </div>
          </a>          
        </Link>

        <nav className="navLinks">
          <NavLink 
            text="Home"       
            route="/"
          />

          <NavLink 
            text="Liked Maps"
            route="/liked"
          />

          <NavLink 
            text="Ongoing Games"
            route="/ongoing"
          />
        </nav>
      </div>
      

      <div className="rightContainer">
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
                <Button type="solidCustom" backgroundColor='#3d3d3d' color='#fff' hoverColor='#444' height='34px'>Login</Button>
              </a>
            </Link>

            <Link href="/register">
              <a>
                <Button type="solidPurple" height='34px'>Sign Up</Button>
              </a>
            </Link>  
          </div>                
        }            
      </div>   
   
    </StyledNavbar>
  )
}

export default Navbar

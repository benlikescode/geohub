import { FC } from 'react'
import { StyledNavbar } from '.'
import { BellIcon } from '@heroicons/react/outline'
import { Avatar, Button, FlexGroup, Icon, Searchbar } from '../../System'
import { selectUser } from '../../../redux/user'
import { useSelector } from 'react-redux'
import { UserType } from '../../../types'
import Link from 'next/link'

const Navbar: FC = () => {
  const user: UserType = useSelector(selectUser)

  return (
    <StyledNavbar>
      <h2 className="title">GeoHub</h2>

      {user.name ? 
        <div className="rightWrapper">
          <Searchbar />
          <Button type="icon">
            <Icon size={24}>
              <BellIcon />
            </Icon>
          </Button>  
          <div className="userInfo">
            <Avatar url={user.avatar} alt="" size={30}/>
            <span className="username">{user.name}</span>
          </div>
        </div>
        :
        <FlexGroup gap={15}>
          <Link href="/login">
           <a>
            <Button type="ghost" width="120px">Login</Button>
           </a>
          </Link>

          <Link href="/register">
            <a>
              <Button type="solidBlue" width="120px">Sign Up</Button>
            </a>
          </Link>       
        </FlexGroup>       
    }    
    </StyledNavbar>
  )
}

export default Navbar

import { FC } from 'react'
import { StyledNavbar } from '.'
import { BellIcon } from '@heroicons/react/outline'
import { Avatar, Button, Icon, Searchbar } from '../System'
import { selectUser } from '../../redux/user'
import { useSelector } from 'react-redux'
import { UserType } from '../../types'

const Navbar: FC = () => {
  const user: UserType = useSelector(selectUser)

  return (
    <StyledNavbar>
      <h2 className="title">GeoHub</h2>

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
    </StyledNavbar>
  )
}

export default Navbar

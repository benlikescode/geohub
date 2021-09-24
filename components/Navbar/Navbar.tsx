import { FC } from 'react'
import { StyledNavbar } from '.'
import { BellIcon } from '@heroicons/react/outline'
import { Avatar, Button, Icon, Searchbar } from '../System'

const Navbar: FC = () => {
  const avatar = "https://images.clipartlogo.com/files/istock/previews/9726/97260923-eiffel-tower-icon-paris-sign.jpg"
  const name = "BenZ"

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
          <Avatar url={avatar} alt="" size={30}/>
          <span className="username">{name}</span>
        </div>
      </div>
    </StyledNavbar>
  )
}

export default Navbar

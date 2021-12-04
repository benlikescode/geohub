import { FC } from 'react'
import { StyledNavbar } from '.'
import { LocationMarkerIcon } from '@heroicons/react/outline'
import { Avatar, Button, FlexGroup, Icon, Searchbar } from '../../System'
import { selectUser } from '../../../redux/user'
import { useSelector } from 'react-redux'
import { UserType } from '../../../types'
import Link from 'next/link'

type Props = {
  isAuthpage?: boolean
  variant?: boolean
}

const Navbar: FC<Props> = ({ isAuthpage, variant }) => {
  const user: UserType = useSelector(selectUser)

  return (
    <StyledNavbar>
      {variant ?
        <div className="variantWrapper">
          <Link href="/">
            <a>
              <div className="variantLogoWrapper">
                <div className="logo">
                  <Icon size={28} fill="#fff">
                    <LocationMarkerIcon />
                  </Icon>
                </div>
                <h2 className="title">GeoHub</h2>
              </div>
            </a>          
          </Link>

          {user.id ?
            <Link href={`/user/${user.id}`}>
              <a className="userInfo">
                <span className="username">{user.name}</span>
                <Avatar url={user.avatar} alt="" size={40}/>
              </a>                      
            </Link>
           
            :

            <FlexGroup gap={15}>
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
            </FlexGroup> 
          }   
        </div>

        :

        <>
          <Link href="/">
            <a>
              <div className="logoWrapper">
                <div className="logo">
                  <Icon size={28} fill="#fff">
                    <LocationMarkerIcon />
                  </Icon>
                </div>
                <h2 className="title">GeoHub</h2>
              </div>
            </a>
          </Link>
          
          {!isAuthpage &&
            <div className="mainSection">
              <Searchbar />

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
          }
        </>
      }     
    </StyledNavbar>
  )
}

export default Navbar

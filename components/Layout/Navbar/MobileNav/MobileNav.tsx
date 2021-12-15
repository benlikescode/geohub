import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledMobileNav } from '.'
import user, { selectUser } from '../../../../redux/user'
import { Avatar, Searchbar } from '../../../System'

const MobileNav: FC = () => {
  const user = useSelector(selectUser)

  return (
    <StyledMobileNav>
      <div className="rightWrapper">             
        <Link href={`/user/${user.id}`}>
          <a className="userInfo">
            <Avatar url={`/images/avatars/${user.avatar}.jpg`} alt="" size={32} customOutline="1px solid rgba(255, 255, 255, 0.55)" />
          </a>                      
        </Link>
      </div>

      <Searchbar placeholder='Search' isSmall/>
    </StyledMobileNav>
  )
}

export default MobileNav

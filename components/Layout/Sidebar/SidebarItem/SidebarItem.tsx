import { FC, ReactNode } from 'react'
import { StyledSidebarItem } from '.'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '../../../System'

type Props = {
  text: string
  icon: ReactNode
  route: string
}

const SidebarItem: FC<Props> = ({ text, icon, route }) => {
  const router = useRouter()
  const isActive = `/${router.pathname.split('/')[1]}` === route
  
  return (
    <StyledSidebarItem isActive={isActive}>
      <Link href={route}>
        <div className="item">
          <Icon size={26} fill={isActive ? '#AEB1B5' : ''}>{icon}</Icon>  
          <span className="itemText">{text}</span>
        </div>
      </Link>
    </StyledSidebarItem>
  )
}

export default SidebarItem
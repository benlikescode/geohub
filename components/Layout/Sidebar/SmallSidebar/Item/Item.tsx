import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import { StyledItem } from '.'
import { Icon } from '../../../../System'

type Props = {
  text: string
  icon: ReactNode
  route: string
}

const Item: FC<Props> = ({ icon, route }) => {
  const router = useRouter()
  const isActive = `/${router.pathname.split('/')[1]}` === route
  
  return (
    <StyledItem isActive={isActive}>
      <Link href={route}>
        <a>
          <Icon size={30} fill={isActive ? '#AEB1B5' : ''} padding="10px">
            {icon}
          </Icon>
        </a>
      </Link>
    </StyledItem>
  )
}

export default Item

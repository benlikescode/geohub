import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

import { StyledItem } from './'

type Props = {
  text: string
  icon: ReactNode
  route: string
}

const Item: FC<Props> = ({ text, icon, route }) => {
  const router = useRouter()
  const isActive = router.asPath === route

  return (
    <StyledItem isActive={isActive}>
      <Link href={route}>
        <a className="item">
          {icon}
          <span className="itemText">{text}</span>
        </a>
      </Link>
    </StyledItem>
  )
}

export default Item

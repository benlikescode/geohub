import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledNavLink = styled.div<StyledProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .itemText {
    color: #8a8a8a;
    font-weight: 400;

    ${({ isActive }) => isActive && `
      color: #fff;
    `}

    :hover {
      color: #fff;
    }
  }

  .item {
    //padding: 0.5rem 1rem;
    padding: 0.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    //box-sizing: border-box;
    position: relative;


    /*
    ${({ isActive }) => isActive && `
      border-bottom: 2px solid var(--mediumPurple);
    `}
    */
  }  

  .activeLine {
    position: absolute;
    bottom: 0;
    background-color: var(--mediumPurple);
    width: 100%;
    border-radius: 15px 15px 0 0;
    ${({ isActive }) => isActive && `
      height: 3px;
    `}

  }
`

type Props = {
  text: string
  route: string
}

const NavLink: FC<Props> = ({ text, route }) => {
  const router = useRouter()
  const isActive = `/${router.pathname.split('/')[1]}` === route
  
  return (
    <StyledNavLink isActive={isActive}>
      <Link href={route}>
        <a className="item">
          <span className="itemText">{text}</span>
          <div className="activeLine"></div>
        </a>
      </Link>
    </StyledNavLink>
  )
}

export default NavLink
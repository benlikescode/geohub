import { ImgHTMLAttributes } from 'react'
import styled from 'styled-components'

type StyledProps = {
  size?: number
  backgroundColor?: string
} & ImgHTMLAttributes<HTMLDivElement>

const StyledAvatar = styled.div<StyledProps>`
  .user-avatar {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 0 0 2px inset rgba(0, 0, 0, 0.25);
    background-color: ${({ backgroundColor }) => backgroundColor};

    .emoji {
      padding: 20% !important;
    }
  }

  .map-avatar {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    border-radius: 30%;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 30%;
      box-shadow: 0 0 0 1px inset rgba(255, 255, 255, 0.12);
    }

    img {
      border-radius: 30%;
    }
  }
`

export default StyledAvatar

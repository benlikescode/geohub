import styled from 'styled-components'

type StyledProps = {
  backgroundColor?: string
  size?: number
  mobileSize?: number
  outlineSize?: number
  outlineColor?: string
  cursor?: string
}

const StyledAvatar = styled.div<StyledProps>`
  .user-avatar {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: ${({ backgroundColor }) => backgroundColor ?? '#131315'};
    border-radius: 50%;
    position: relative;
    cursor: ${({ cursor }) => cursor};
    box-shadow: ${({ outlineSize, outlineColor }) =>
      `0 0 0 ${outlineSize !== undefined ? outlineSize : 2}px inset ${outlineColor || 'rgba(0, 0, 0, 0.25)'}`};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 600px) {
      height: ${({ mobileSize, size }) => mobileSize ?? size}px;
      width: ${({ mobileSize, size }) => mobileSize ?? size}px;
    }

    img {
      height: 60%;
    }
  }

  .map-avatar {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: ${({ backgroundColor }) => backgroundColor ?? '#131315'};
    border-radius: 30%;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 30%;
      box-shadow: ${({ outlineSize, outlineColor }) =>
        `0 0 0 ${outlineSize !== undefined ? outlineSize : 1}px inset ${outlineColor || 'rgba(255, 255, 255, 0.12)'}`};
    }

    @media (max-width: 600px) {
      height: ${({ mobileSize, size }) => mobileSize ?? size}px;
      width: ${({ mobileSize, size }) => mobileSize ?? size}px;
    }

    img {
      position: absolute;
      object-fit: cover;
      border-radius: 30%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`

export default StyledAvatar

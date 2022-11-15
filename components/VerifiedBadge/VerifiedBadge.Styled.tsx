import styled from 'styled-components'

type StyledProps = {
  size?: number
}

const StyledVerifiedBadge = styled.div<StyledProps>`
  margin-left: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: ${({ size }) => size ?? 24}px;
    color: #1d9bf0;
  }
`

export default StyledVerifiedBadge

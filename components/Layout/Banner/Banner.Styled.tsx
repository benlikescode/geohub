import styled from 'styled-components'

type StyledProps = {
  hasPadding?: boolean
}

const StyledBanner = styled.div<StyledProps>`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: ${({ hasPadding }) => hasPadding && '30px 40px'};
`

export default StyledBanner

import styled from 'styled-components'

type StyledProps = {
  removeMargin?: boolean
}

const StyledPageHeader = styled.h1<StyledProps>`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: ${({ removeMargin }) => (removeMargin ? 0 : '3rem')};
`

export default StyledPageHeader

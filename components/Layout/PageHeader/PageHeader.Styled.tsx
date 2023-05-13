import styled from 'styled-components'

type StyledProps = {
  removeMargin?: boolean
}

const StyledPageHeader = styled.h1<StyledProps>`
  font-size: 1.375rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: ${({ removeMargin }) => (removeMargin ? 0 : '20px')};
`

export default StyledPageHeader

import styled from 'styled-components'

type StyledProps = {}

const StyledTextWithLinks = styled.div<StyledProps>`
  a {
    color: #1d9bf0;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default StyledTextWithLinks

import styled from 'styled-components'

type StyledProps = {
  background?: string;
  color?: string;
  highlightColor?: string;
}

const StyledBlockQuote = styled.blockquote<StyledProps>`
  border-left: 2px solid ${({ highlightColor }) => highlightColor ? highlightColor : '#ff9b9b'};
  background: ${({ background }) => background ?  background : '#202020'};
  color: ${({ color }) => color ? color : '#ff9b9b'};
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  width: fit-content;
`

export default StyledBlockQuote
import styled from 'styled-components'

type StyledProps = {
  background?: string
  color?: string
  transparent?: boolean
}

const StyledPill = styled.div<StyledProps>`
  background-color: ${({ transparent, background }) => transparent ? 'transparent' : background};
  color: ${({ color }) => color ? color : '#fff'};
  padding: 5px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 50rem;
  font-size: 14px;
  font-weight: 400;
`

export default StyledPill

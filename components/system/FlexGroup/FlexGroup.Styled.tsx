import styled from 'styled-components'

type StyledProps = {
  align?: 'center' | 'baseline' | 'flex-start' | 'flex-end'
  justify?: 'center' | 'space-between'
  direction?: 'column' | 'row'
  gap?: number
}

const StyledFlexGroup = styled.div<StyledProps>`
  display: flex;
  align-items: ${({ align }) => align ? align : 'center'};
  justify-content: ${({ justify }) => justify};
  gap: ${({ gap }) => gap ? gap : '8'}px;
  flex-direction: ${({ direction }) => direction ? direction : 'row'};
`

export default StyledFlexGroup
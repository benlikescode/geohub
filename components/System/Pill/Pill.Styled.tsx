import styled from 'styled-components'

type StyledProps = {
  background?: string
  color?: string
  transparent?: boolean
}

const StyledPill = styled.div<StyledProps>`
  background: rgba(200, 200, 200, 0.2);
  color: ${({ color }) => (color ? color : '#fff')};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 400;
  height: 30px;
`

export default StyledPill

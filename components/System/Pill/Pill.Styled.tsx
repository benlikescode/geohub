import styled from 'styled-components'

type StyledProps = {
  background?: string
  color?: string
  transparent?: boolean
}

const StyledPill = styled.div<StyledProps>`
  background: rgba(255, 255, 255, 0.2);
  //border: 1px solid rgba(225, 225, 225, 0.25);
  color: ${({ color }) => color ? color : '#fff'};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  height: 30px;
`

export default StyledPill

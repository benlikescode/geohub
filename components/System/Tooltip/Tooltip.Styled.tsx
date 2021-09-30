import styled from 'styled-components'

type StyledProps = {
  top?: number
  left?: number
}

const StyledTooltip = styled.div<StyledProps>` 
  position: absolute;
  top: ${({ top }) => top ? top : 0}px;
  left: ${({ left }) => left ? left : 0}px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background2);
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 400;
  font-size: 14px;
  width: fit-content;
  pointer-events: none;
  white-space: nowrap; 
`

export default StyledTooltip

import styled from 'styled-components'

type StyledProps = {
  top?: number
  left?: number
  position: 'top' | 'right' | 'bottom' | 'left'
}

const StyledTooltip = styled.div<StyledProps>`
  position: absolute;
  top: ${({ top }) => (top ? `${top}px` : '50%')};
  left: ${({ left }) => (left ? `${left}px` : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 400;
  font-size: 14px;
  width: fit-content;
  pointer-events: none;
  white-space: nowrap;
  transform: translateY(-50%) scale(1);
  margin-left: 10px;

  ${({ position }) =>
    position === 'bottom' &&
    `
     .arrow {
      left: 50%;
      bottom: -3px;
      transform: translateX(-50%);
      position: absolute;

      &::before {
        content: '';
        background: none;
        border-bottom: 6px solid transparent;
        border-right: 6px solid rgba(0, 0, 0, 0.75);;
        border-top: 6px solid transparent;
        height: 0;
        margin-top: -6px;
        position: fixed;
        visibility: visible;
        width: 0;
        transform: rotate(-90deg);
      }
    }
  `}

  ${({ position }) =>
    position === 'left' &&
    `
     .arrow {
      left: -6px;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;

      &::before {
        content: '';
        background: none;
        border-bottom: 6px solid transparent;
        border-right: 6px solid rgba(0, 0, 0, 0.75);;
        border-top: 6px solid transparent;
        height: 0;
        margin-top: -6px;
        position: fixed;
        visibility: visible;
        width: 0;
        transform: rotate(0deg);
      }
    }
  `}
`

export default StyledTooltip

import styled, { keyframes } from 'styled-components'

type StyledProps = {
  noOverflow?: boolean
  maxWidth?: string
  isOpen?: boolean
  showCloseAnim?: boolean
}

const popInAnim = keyframes`
  from {
    opacity: 0;
    top: calc(50% + 12px);
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
`

const popOutAnim = keyframes`
  from {
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    top: calc(50% + 12px);
    transform: translate(-50%, -50%) scale(0.9);
  }
`

const StyledModal = styled.div<StyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 50;

  .modal {
    z-index: 50;
    border-radius: 6px;
    position: fixed;
    margin: 2rem;
    top: 50%;
    left: 50%;
    outline: none;
    overflow: ${({ noOverflow }) => (noOverflow ? 'hidden' : 'unset')};
    transform: translate(-50%, -50%);
    background-color: var(--background2);
    margin: 0;
    padding: 0;
    border: 0;
    box-shadow: 0 0 0 1px #00000019, 0 2px 4px 0px #00000036;
    /* animation: forwards 0.05s ease-in-out ${({ showCloseAnim }) => (showCloseAnim ? popOutAnim : popInAnim)}; */
    /* animation: forwards 0.1s ease-in-out ${({ showCloseAnim }) => showCloseAnim && popOutAnim}; */
    color: #fff;
    width: max-content;

    ${({ maxWidth }) =>
      maxWidth &&
      `
      max-width: ${maxWidth};
      width: 100%;
    `}

    .modal-content {
      max-height: 100vh;
      max-width: 100vw;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: 0.1s;
    opacity: ${({ showCloseAnim }) => (showCloseAnim ? 0 : 1)};
    background-color: rgba(0, 0, 0, 0.95);
  }

  @media (pointer: none), (pointer: coarse) {
    height: 100vh;

    .modal {
      .modal-content {
        max-height: -webkit-fill-available;
      }
    }
  }
`

export default StyledModal

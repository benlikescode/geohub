import styled from 'styled-components'

type StyledProps = {
  maxWidth?: string
  isSubmitting?: boolean
}

const StyledModal = styled.div<StyledProps>`
  .layerContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none !important;
    pointer-events: none;
    z-index: 99;
  }

  .modal {
    width: 100%;
    max-width: ${({ maxWidth }) => maxWidth ?? '650px'};
    background-color: var(--background2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    pointer-events: all;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .modal-header {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #282828;

      .modal-title {
        font-size: 1.25rem;
        font-weight: 400;
      }
    }

    .modal-body {
      background-color: var(--background1);
      max-height: calc(100vh * 0.7);
      overflow: hidden auto;
    }

    .modal-footer {
      border-top: 1px solid #282828;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;

      .cancel-button {
        background-color: rgb(255, 255, 255, 0.1);
        color: rgb(255, 255, 255, 0.7);
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 400;
        user-select: none;
        padding: 10px 16px;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
        }
      }

      .action-button {
        background-color: var(--mediumPurple);
        color: #fff;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 400;
        user-select: none;
        padding: ${({ isSubmitting }) => (isSubmitting ? '10px 25px' : '10px 16px')};

        &.disabled {
          background-color: #404040;
          color: var(--color2);
          pointer-events: none;
          opacity: 0.5;
        }

        :hover {
          background-color: #732fe9;
        }
      }
    }
  }

  .backdrop {
    opacity: 0.95;
    background: rgb(0, 0, 0);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
  }
`

export default StyledModal

import styled from 'styled-components'

type StyledProps = {}

const StyledMainModal = styled.div<StyledProps>`
  .modal-header {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .modal-title {
      font-size: 16px;
      font-weight: 400;
    }

    .close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: var(--color2);
      padding: 4px;
      border-radius: 6px;

      &:hover {
        background-color: #222;
      }

      svg {
        height: 20px;
      }
    }
  }

  .modal-body {
    background-color: #141414;
    max-height: calc(100vh * 0.7);
    overflow: hidden auto;
  }

  .modal-footer {
    padding: 14px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;

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
      padding: 10px 16px;

      &:disabled {
        background-color: #404040;
        color: var(--color2);
        cursor: not-allowed !important;
        opacity: 0.5;
      }

      :hover {
        background-color: var(--indigo-600);
      }
    }
  }
`

export default StyledMainModal

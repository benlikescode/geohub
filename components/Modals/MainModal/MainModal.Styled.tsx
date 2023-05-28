import styled from 'styled-components'

const StyledMainModal = styled.div`
  .modal-header {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #282828;

    .modal-title {
      font-size: 18px;
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
        height: 24px;
      }
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

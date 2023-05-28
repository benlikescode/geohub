import styled from 'styled-components'

const StyledAuthModal = styled.div`
  .header {
    padding: 16px;
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

  .main-content {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #131314;

    .buttons-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;

      a {
        width: 100%;
      }
    }
  }
`

export default StyledAuthModal

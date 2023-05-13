import styled from 'styled-components'

const StyledAuthModal = styled.div`
  .header {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #282828;

    .modal-title {
      font-size: 1.25rem;
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

  .mainContent {
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #131314;
  }

  .buttonsWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0;

    a {
      width: 100%;
    }
  }
`

export default StyledAuthModal

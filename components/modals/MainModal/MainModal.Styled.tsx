import styled from 'styled-components'

type StyledProps = {}

const StyledMainModal = styled.div<StyledProps>`
  .modal-header {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #222;
    background-color: #1d1d1d;

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
    max-height: calc(100vh * 0.7);
    overflow: hidden auto;
  }

  .modal-footer {
    border-top: 1px solid #222;
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`

export default StyledMainModal

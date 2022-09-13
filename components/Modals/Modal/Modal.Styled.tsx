import styled from 'styled-components'

type StyledProps = {
  width?: string
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
    max-width: ${({ width }) => (width ? width : '650px')};
    max-height: 700px;
    min-height: 200px;
    background-color: var(--background2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    pointer-events: all;
    overflow: hidden;
    border-radius: 6px;

    .modal-header {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--border);

      .modal-title {
        font-size: 1.25rem;
        font-weight: 400;
      }
    }

    .modal-body {
      background-color: var(--background1);
      overflow: hidden auto;
      padding: 2rem;
    }

    .modal-footer {
      border-top: var(--border);
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: flex-end;

      .action-button {
        background-color: var(--mediumPurple);
        color: #fff;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 400;
        user-select: none;
        padding: 12px 10px;

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

import styled from 'styled-components'

type StyledProps = {}

const StyledCreateMapModal = styled.div<StyledProps>`
  padding: var(--modalPadding);
  display: grid;
  gap: 40px;

  .section-title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color2);
  }

  .avatar-selection {
    .avatars {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1rem;

      .avatar-item {
        height: 56px;
        width: 56px;
        position: relative;
        border-radius: 50%;
        box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
        background-color: #888888;

        &.selected {
          box-shadow: none;
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        &:hover {
          transform: scale(1.05);
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          object-fit: cover;
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  .visibility-selection {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .visibility-warning {
      color: #888888;
      font-size: 14px;
      font-weight: 500;
      display: block;
      margin-top: 8px;
    }
  }
`

export default StyledCreateMapModal

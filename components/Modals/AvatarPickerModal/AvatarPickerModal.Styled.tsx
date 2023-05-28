import styled from 'styled-components'

type StyledProps = {}

const StyledAvatarPickerModal = styled.div<StyledProps>`
  padding: var(--modalPadding);
  display: grid;
  gap: 3rem;

  .color-selection-title {
    font-size: 14px;
    font-weight: 400;
    color: #919191;
  }

  .color-options-wrapper {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 14px;

    .color-option {
      height: 40px;
      width: 40px;
      border-radius: 50rem;
      cursor: pointer;
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;

      &.selected {
        border: 2px solid var(--background1);
        outline: 2px solid white;
      }

      &:hover {
        transform: scale(1.02);
      }

      .checkmark-wrapper {
        height: 22px;
        width: 22px;
        border-radius: 50rem;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          height: 18px;
        }
      }

      .emoji {
        height: 22px;
        width: 22px;
      }
    }
  }
`

export default StyledAvatarPickerModal

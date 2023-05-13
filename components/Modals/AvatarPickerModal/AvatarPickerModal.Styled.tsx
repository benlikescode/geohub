import styled from 'styled-components'

type StyledProps = {}

const StyledAvatarPickerModal = styled.div<StyledProps>`
  padding: var(--modalPadding);
  display: grid;
  gap: 3rem;

  .color-selection-title {
    font-size: 1rem;
    font-weight: 500;
    color: #919191;
  }

  .color-options-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 16px;

    .color-option {
      height: 48px;
      width: 48px;
      border-radius: 50rem;
      cursor: pointer;
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;

      &.selected {
        border: 2px solid var(--background1);

        outline: 3px solid white;
      }

      &:hover {
        transform: scale(1.05);
      }

      .checkmark-wrapper {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50rem;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .emoji {
    height: 24px;
    width: 24px;
  }
`

export default StyledAvatarPickerModal

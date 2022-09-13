import styled from 'styled-components'

type StyledProps = {}

const StyledAvatarPickerModal = styled.div<StyledProps>`
  .color-selection-title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color2);
  }

  .color-options-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;

    .color-option {
      height: 4rem;
      width: 4rem;
      border-radius: 50rem;
      cursor: pointer;
      border: 3px solid rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;

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
    height: 2rem;
    width: 2rem;
  }
`

export default StyledAvatarPickerModal

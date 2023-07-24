import styled, { keyframes } from 'styled-components'

const slideUpAndFade = keyframes`
   from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideRightAndFade = keyframes`
 from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideLeftAndFade = keyframes`
    from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const StyledCreateMapDropdown = styled.div`
  .trigger-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
    height: 35px;
    width: 35px;
    border-radius: 4px;
    color: #999;

    &:hover {
      background-color: #444;
      color: #ccc;
    }

    svg {
      height: 20px;
    }
  }

  .DropdownMenuContent {
    min-width: 220px;
    background-color: #333;
    border-radius: 6px;
    padding: 5px;
    /* box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2); */
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
    z-index: 99;

    &[data-side='top'] {
      animation-name: ${slideDownAndFade};
    }

    &[data-side='right'] {
      animation-name: ${slideLeftAndFade};
    }

    &[data-side='bottom'] {
      animation-name: ${slideUpAndFade};
    }

    &[data-side='left'] {
      animation-name: ${slideRightAndFade};
    }
  }

  .DropdownMenuItem {
    font-size: 13px;
    line-height: 1;
    color: #dcdcdc;
    border-radius: 3px;
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    outline: none;

    /* &[data-disabled] {
      color: var(--mauve-8);
      pointer-events: none;
    } */

    /* &[data-highlighted] {
      background-color: #555;
      color: var(--violet-1);
    } */

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }

  .DropdownMenuSeparator {
    height: 1px;
    background-color: #505050;
    margin: 5px;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  .item-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 20px;
    border-radius: 3px;
    font-weight: 400;
    width: 100%;
    position: relative;

    &:hover {
      background-color: #282828;

      &.destructive {
        background-color: #7f1d1d;
      }
    }
  }
`

export default StyledCreateMapDropdown

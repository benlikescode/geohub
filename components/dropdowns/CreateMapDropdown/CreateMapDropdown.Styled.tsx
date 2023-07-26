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
      background-color: #383838;
      color: #ccc;
    }

    svg {
      height: 20px;
    }
  }

  .DropdownMenuContent {
    min-width: 185px;
    background-color: #333;
    border-radius: 6px;
    padding: 5px;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
    z-index: 99;
    box-shadow: 0 0 0 1px #434343;

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

  /* .DropdownMenuItem {
    font-size: 13px;
    line-height: 1;
    color: #dcdcdc;
    border-radius: 3px;
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    outline: none;
    padding: 0 20px;

    &:hover {
      background-color: #434343;
      color: #fff;

      &.destructive {
        background-color: #b02828;
        color: #fff;
      }
    }

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  } */

  .DropdownMenuSeparator {
    height: 1px;
    background-color: #505050;
    margin: 5px;
  }

  /* .item-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 36px;
    border-radius: 3px;
    font-weight: 400;
    width: 100%;
    position: relative;
    user-select: none;
    outline: none;
    font-size: 13px;
  }

  .item-input-button {
    input {
      display: none;
    }

    label {
      cursor: pointer;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 36px;
      font-size: 13px;
      user-select: none;
      outline: none;
      position: relative;
      border-radius: 3px;
      font-weight: 400;
      color: #dcdcdc;

      &:hover {
        background-color: #434343;
        color: #fff;
      }
    }
  } */

  .new-item-wrapper {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 36px;
    font-size: 13px;
    user-select: none;
    outline: none;
    position: relative;
    border-radius: 3px;
    font-weight: 400;
    color: #dcdcdc;

    &:hover {
      background-color: #434343;
      color: #fff;

      &.destructive {
        background-color: #b02828;
        color: #fff;
      }
    }
  }

  input[type='file'] {
    display: none;
  }
`

export default StyledCreateMapDropdown
